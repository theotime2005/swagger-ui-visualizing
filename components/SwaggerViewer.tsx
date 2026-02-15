import React, { useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import { AlertCircle } from 'lucide-react';
import { isValidJson } from '../utils/parser';

interface SwaggerViewerProps {
  spec: string;
}

export const SwaggerViewer: React.FC<SwaggerViewerProps> = ({ spec }) => {
  // Memoize the spec object to prevent unnecessary re-renders of SwaggerUI
  const parsedSpec = useMemo(() => {
    if (!isValidJson(spec)) return null;
    try {
      return JSON.parse(spec);
    } catch {
      return null;
    }
  }, [spec]);

  if (!parsedSpec) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 text-slate-500 p-8 text-center">
        <div className="max-w-md">
            <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">Invalid JSON</h3>
            <p>Please fix the syntax errors in the editor to render the Swagger UI.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-white relative swagger-container">
      <div className="absolute top-0 right-0 p-2 bg-slate-50/90 backdrop-blur text-xs text-slate-400 border-b border-l rounded-bl-lg pointer-events-none z-10">
        Swagger UI Viewer
      </div>
      <div className="p-4">
        <SwaggerUI spec={parsedSpec} />
      </div>
    </div>
  );
};
