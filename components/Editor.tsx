import React, { useState } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setIsEditorReady(true);
    // Configure JSON settings for a better editing experience
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
      enableSchemaRequest: false,
    });
  };

  return (
    <div 
      className="h-full relative group" 
      role="region" 
      aria-label={t('editor.label')}
    >
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" aria-hidden="true" />
            <span className="text-sm text-slate-500">{t('editor.loading')}</span>
          </div>
        </div>
      )}
      <Editor
        height="100%"
        defaultLanguage="json"
        value={value}
        onChange={onChange}
        theme="vs-light" 
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          wordWrap: 'on',
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          formatOnPaste: true,
          formatOnType: true,
          ariaLabel: t('editor.label'),
        }}
      />
      <div className="absolute top-0 right-0 p-2 bg-white/90 backdrop-blur text-xs text-slate-400 border-b border-l rounded-bl-lg pointer-events-none z-10" aria-hidden="true">
        {t('editor.label')}
      </div>
    </div>
  );
};