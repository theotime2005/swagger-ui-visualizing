import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';
import * as parserUtils from './utils/parser';

declare const describe: any;
declare const it: any;
declare const expect: any;
declare const jest: any;
declare const beforeEach: any;

// Mock the child components to simplify integration testing
// We want to test the wiring, not the child implementation details again
jest.mock('./components/FileUploader', () => ({
  FileUploader: ({ onFileLoaded }: any) => (
    <div data-testid="uploader-mock">
      <button onClick={() => onFileLoaded('test.json', '{"app":"test"}')}>
        Simulate Upload
      </button>
    </div>
  ),
}));

jest.mock('./components/Editor', () => ({
  CodeEditor: ({ value, onChange }: any) => (
    <textarea 
      data-testid="editor-mock"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  ),
}));

jest.mock('./components/SwaggerViewer', () => ({
  SwaggerViewer: ({ spec }: any) => (
    <div data-testid="viewer-mock">{spec}</div>
  ),
}));

describe('App Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts in upload mode', () => {
    render(<App />);
    expect(screen.getByTestId('uploader-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('editor-mock')).not.toBeInTheDocument();
  });

  it('switches to editor/viewer mode after file load', async () => {
    render(<App />);
    
    // Trigger upload from the mock
    fireEvent.click(screen.getByText('Simulate Upload'));

    await waitFor(() => {
      expect(screen.queryByTestId('uploader-mock')).not.toBeInTheDocument();
      expect(screen.getByTestId('editor-mock')).toBeInTheDocument();
      expect(screen.getByTestId('viewer-mock')).toBeInTheDocument();
    });

    // Check if content was passed down
    expect(screen.getByTestId('editor-mock')).toHaveValue('{"app":"test"}');
    expect(screen.getByTestId('viewer-mock')).toHaveTextContent('{"app":"test"}');
  });

  it('updates viewer when editor content changes', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Simulate Upload'));

    const editor = await screen.findByTestId('editor-mock');
    fireEvent.change(editor, { target: { value: '{"updated":true}' } });

    expect(screen.getByTestId('viewer-mock')).toHaveTextContent('{"updated":true}');
  });

  it('clears state when clear button in header is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Simulate Upload'));
    
    expect(screen.getByTestId('editor-mock')).toBeInTheDocument();

    // Find clear button in Header (Header is not mocked in this file, so we find by Aria Label)
    const clearBtn = screen.getByLabelText('header.clear');
    fireEvent.click(clearBtn);

    // Confirm dialog is mocked in setupTests.ts to return true
    expect(window.confirm).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('uploader-mock')).toBeInTheDocument();
      expect(screen.queryByTestId('editor-mock')).not.toBeInTheDocument();
    });
  });

  it('downloads file when download button is clicked', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Simulate Upload'));

    const downloadBtn = screen.getByLabelText('header.export');
    fireEvent.click(downloadBtn);

    expect((global as any).URL.createObjectURL).toHaveBeenCalled();
    // We can't easily test the anchor click and download in jsdom, but we can verify the prep steps
  });
});