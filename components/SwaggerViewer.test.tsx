import React from 'react';
import { render, screen } from '@testing-library/react';
import { SwaggerViewer } from './SwaggerViewer';

declare const describe: any;
declare const it: any;
declare const expect: any;

describe('SwaggerViewer Component', () => {
  it('renders error state for invalid JSON', () => {
    render(<SwaggerViewer spec="{invalid json" />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('viewer.invalid_json')).toBeInTheDocument();
  });

  it('renders SwaggerUI for valid JSON', () => {
    const validSpec = '{"openapi": "3.0.0", "info": {"title": "Test"}}';
    render(<SwaggerViewer spec={validSpec} />);
    
    expect(screen.getByTestId('swagger-ui-mock')).toBeInTheDocument();
    // The mock prints the spec as string
    expect(screen.getByText(validSpec)).toBeInTheDocument();
  });
});