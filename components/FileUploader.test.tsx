import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FileUploader } from './FileUploader';
import * as parserUtils from '../utils/parser';

declare const describe: any;
declare const it: any;
declare const expect: any;
declare const jest: any;
declare const beforeEach: any;

describe('FileUploader Component', () => {
  const mockOnFileLoaded = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<FileUploader onFileLoaded={mockOnFileLoaded} />);
    expect(screen.getByText('uploader.title')).toBeInTheDocument();
    expect(screen.getByText('uploader.select_file')).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    render(<FileUploader onFileLoaded={mockOnFileLoaded} />);
    
    // Spy on parser
    jest.spyOn(parserUtils, 'parseFileContent').mockReturnValue('{"parsed": true}');

    const file = new File(['{"foo":"bar"}'], 'test.json', { type: 'application/json' });
    
    // Improve File mock to include text() method which is used in component
    file.text = async () => '{"foo":"bar"}';

    // Get the hidden input
    // The component has a button that triggers the input ref, but for testing we can target the input directly
    // Usually hidden inputs are not accessible by role, so we use selector or container
    const input = document.querySelector('input[type="file"]');
    
    if (!input) throw new Error('Input not found');

    await fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(mockOnFileLoaded).toHaveBeenCalledWith('test.json', '{"parsed": true}');
    });
  });

  it('displays error message on parse failure', async () => {
    render(<FileUploader onFileLoaded={mockOnFileLoaded} />);
    
    // Mock parser failure
    jest.spyOn(parserUtils, 'parseFileContent').mockImplementation(() => {
      throw new Error('Bad Format');
    });

    const file = new File(['bad content'], 'test.json', { type: 'application/json' });
    file.text = async () => 'bad content';

    const input = document.querySelector('input[type="file"]');
    if (!input) throw new Error('Input not found');

    await fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText(/Bad Format/i)).toBeInTheDocument();
    });
    
    expect(mockOnFileLoaded).not.toHaveBeenCalled();
  });
});