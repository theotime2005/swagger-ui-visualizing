import React, { useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isValidJson } from '../utils/parser';

interface SwaggerViewerProps {
  spec: string;
}

export const SwaggerViewer: React.FC<SwaggerViewerProps> = ({ spec }) => {
  const { t } = useTranslation();
  
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
      <div 
        className="h-full flex items-center justify-center bg-slate-50 text-slate-500 p-8 text-center"
        role="region"
        aria-label={t('viewer.label')}
      >
        <div className="max-w-md" role="alert">
            <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">{t('viewer.invalid_json')}</h3>
            <p>{t('viewer.fix_syntax')}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-full overflow-auto bg-white relative swagger-container"
      role="region"
      aria-label={t('viewer.label')}
    >
      <div className="absolute top-0 right-0 p-2 bg-slate-50/90 backdrop-blur text-xs text-slate-400 border-b border-l rounded-bl-lg pointer-events-none z-10" aria-hidden="true">
        {t('viewer.label')}
      </div>
      <div className="p-4">
        <SwaggerUI spec={parsedSpec} />
      </div>
    </div>
  );
};