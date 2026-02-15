import '@testing-library/jest-dom';
import React from 'react';

// Declare globals that are injected by the test environment but missing in TS context
declare var jest: any;
declare var global: any;

// Mock TextEncoder/TextDecoder for js-dom (used by js-yaml/react)
import { TextEncoder, TextDecoder } from 'util';
Object.assign(globalThis, { TextEncoder, TextDecoder });

// Mock URL.createObjectURL for file downloads
(globalThis as any).URL.createObjectURL = jest.fn(() => 'mock-url');
(globalThis as any).URL.revokeObjectURL = jest.fn();

// Mock window.confirm
(globalThis as any).confirm = jest.fn(() => true);

// Mock i18next to avoid loading actual translation files during tests
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock Monaco Editor (it uses canvas which is hard to test in jsdom)
// Replaced JSX with React.createElement to avoid parsing errors in .ts file
jest.mock('@monaco-editor/react', () => {
  const FakeEditor = ({ value, onChange, ariaLabel }: any) => {
    return React.createElement('textarea', {
      'data-testid': "monaco-editor-mock",
      'aria-label': ariaLabel,
      value: value,
      onChange: (e: any) => onChange(e.target.value)
    });
  };
  return {
    __esModule: true,
    default: FakeEditor,
  };
});

// Mock Swagger UI (heavy component)
// Replaced JSX with React.createElement
jest.mock('swagger-ui-react', () => {
  return function DummySwaggerUI({ spec }: any) {
    return React.createElement('div', {
        'data-testid': "swagger-ui-mock"
      },
      spec ? JSON.stringify(spec) : 'No Spec'
    );
  };
});

// Mock matchMedia for components that might check screen size
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    media: '',
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
};