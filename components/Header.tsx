import React from 'react';
import { FileCode2, Upload, Trash2, Download, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  fileName?: string;
  onUploadClick: () => void;
  onClear: () => void;
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ fileName, onUploadClick, onClear, onDownload }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm" role="banner">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg" aria-hidden="true">
          <FileCode2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">{t('header.title')}</h1>
          {fileName && (
            <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]" title={fileName}>
              {fileName}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
         <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 rounded-md hover:bg-slate-50 transition-colors mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={i18n.language.startsWith('fr') ? "Switch to English" : "Passer en Français"}
          title={i18n.language.startsWith('fr') ? t('header.lang_en') : t('header.lang_fr')}
        >
          <Languages className="w-4 h-4" aria-hidden="true" />
          <span className="font-medium">{i18n.language.startsWith('fr') ? 'FR' : 'EN'}</span>
        </button>

        {!fileName ? (
           <span className="text-sm text-slate-400 italic mr-2 hidden sm:inline" aria-hidden="true">{t('header.load_hint')}</span>
        ) : (
          <>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              aria-label={t('header.export')}
              title={t('header.export')}
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('header.export')}</span>
            </button>
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              aria-label={t('header.clear')}
              title={t('header.clear')}
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('header.clear')}</span>
            </button>
          </>
        )}
        {!fileName && (
            <button
            onClick={onUploadClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
            aria-label={t('header.load_btn')}
            >
            <Upload className="w-4 h-4" aria-hidden="true" />
            <span>{t('header.load_btn')}</span>
            </button>
        )}
      </div>
    </header>
  );
};