import React from 'react';
import { FileCode2, Upload, Trash2, Download } from 'lucide-react';

interface HeaderProps {
  fileName?: string;
  onUploadClick: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ fileName, onUploadClick, onClear, onDownload }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <FileCode2 className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">OpenAPI Editor</h1>
          {fileName && (
            <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]" title={fileName}>
              {fileName}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!fileName ? (
           <span className="text-sm text-slate-400 italic mr-2 hidden sm:inline">Load a file to start editing</span>
        ) : (
          <>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-label="Download JSON"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              aria-label="Clear current file"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </>
        )}
        {!fileName && (
            <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
            aria-label="Upload OpenAPI file"
            >
            <Upload className="w-4 h-4" />
            <span>Load File</span>
            </button>
        )}
      </div>
    </header>
  );
};
