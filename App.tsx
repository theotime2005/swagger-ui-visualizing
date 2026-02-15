import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { CodeEditor } from './components/Editor';
import { SwaggerViewer } from './components/SwaggerViewer';

function App() {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(null);
  const [specContent, setSpecContent] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileLoaded = useCallback((name: string, content: string) => {
    setFileName(name);
    setSpecContent(content);
  }, []);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setSpecContent(value);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (window.confirm(t('app.confirm_clear'))) {
      setFileName(null);
      setSpecContent(null);
    }
  }, [t]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onHeaderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      file.text().then(text => {
          import('./utils/parser').then(({ parseFileContent }) => {
            try {
               const parsed = parseFileContent(text, file.name);
               handleFileLoaded(file.name, parsed);
            } catch (err) {
                alert(t('app.error_parse') + (err as Error).message);
            }
          });
      });
    }
    e.target.value = '';
  };

  const handleDownload = () => {
    if (!specContent || !fileName) return;
    const blob = new Blob([specContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      <Header 
        fileName={fileName || undefined} 
        onUploadClick={handleUploadClick}
        onClear={handleClear}
        onDownload={handleDownload}
      />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept=".json,.yaml,.yml"
        onChange={onHeaderInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      <main className="flex-1 overflow-hidden relative" role="main">
        {!specContent ? (
          <FileUploader onFileLoaded={handleFileLoaded} />
        ) : (
          <div className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left/Top Panel: Editor */}
            <section className="h-1/2 lg:h-full lg:w-1/2 bg-white flex flex-col min-h-0" role="region" aria-label={t('editor.label')}>
              <CodeEditor value={specContent} onChange={handleEditorChange} />
            </section>

            {/* Right/Bottom Panel: Viewer */}
            <section className="h-1/2 lg:h-full lg:w-1/2 bg-slate-50 flex flex-col min-h-0" role="region" aria-label={t('viewer.label')}>
              <SwaggerViewer spec={specContent} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;