import React, { useRef, useState } from 'react';
import { UploadCloud, FileJson, AlertCircle } from 'lucide-react';
import { parseFileContent } from '../utils/parser';

interface FileUploaderProps {
  onFileLoaded: (name: string, content: string) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    try {
      const text = await file.text();
      const parsedJson = parseFileContent(text, file.name);
      onFileLoaded(file.name, parsedJson);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
      <div 
        className={`
          w-full max-w-xl bg-white rounded-xl shadow-lg border-2 border-dashed transition-all duration-200 p-12 text-center
          ${isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-slate-300 hover:border-blue-400'}
          ${error ? 'border-red-300' : ''}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <UploadCloud className="w-10 h-10 text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Upload your OpenAPI Spec</h2>
        <p className="text-slate-500 mb-8">
          Drag and drop your YAML or JSON file here, or click to browse.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-200 focus:outline-none"
        >
          Select File
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".json,.yaml,.yml"
          onChange={onInputChange}
          aria-label="Upload OpenAPI File"
        />

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4" />
            <span>JSON Support</span>
          </div>
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4" />
            <span>YAML Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
