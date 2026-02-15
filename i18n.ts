import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: {
            title: "OpenAPI Editor",
            load_hint: "Load a file to start editing",
            export: "Export JSON",
            clear: "Clear",
            load_btn: "Load File",
            lang_en: "English",
            lang_fr: "French"
          },
          uploader: {
            title: "Upload your OpenAPI Spec",
            drag_drop: "Drag and drop your YAML or JSON file here, or click to browse.",
            select_file: "Select File",
            json_support: "JSON Support",
            yaml_support: "YAML Support",
            error_parse_yaml: "Failed to parse YAML file: ",
            error_parse_json: "Failed to parse JSON file: "
          },
          editor: {
            loading: "Loading Editor...",
            label: "JSON Editor (Monaco)"
          },
          viewer: {
            label: "Swagger UI Viewer",
            invalid_json: "Invalid JSON",
            fix_syntax: "Please fix the syntax errors in the editor to render the Swagger UI."
          },
          app: {
            confirm_clear: "Are you sure you want to clear the current file? Unsaved changes will be lost.",
            error_parse: "Failed to parse file: "
          }
        }
      },
      fr: {
        translation: {
          header: {
            title: "Éditeur OpenAPI",
            load_hint: "Chargez un fichier pour commencer",
            export: "Exporter JSON",
            clear: "Effacer",
            load_btn: "Charger",
            lang_en: "Anglais",
            lang_fr: "Français"
          },
          uploader: {
            title: "Importez votre spécification OpenAPI",
            drag_drop: "Glissez-déposez votre fichier YAML ou JSON ici, ou cliquez pour parcourir.",
            select_file: "Choisir un fichier",
            json_support: "Support JSON",
            yaml_support: "Support YAML",
            error_parse_yaml: "Échec de l'analyse du fichier YAML : ",
            error_parse_json: "Échec de l'analyse du fichier JSON : "
          },
          editor: {
            loading: "Chargement de l'éditeur...",
            label: "Éditeur JSON (Monaco)"
          },
          viewer: {
            label: "Visualiseur Swagger UI",
            invalid_json: "JSON Invalide",
            fix_syntax: "Veuillez corriger les erreurs de syntaxe dans l'éditeur pour afficher Swagger UI."
          },
          app: {
            confirm_clear: "Êtes-vous sûr de vouloir effacer le fichier actuel ? Les modifications non enregistrées seront perdues.",
            error_parse: "Échec de l'analyse du fichier : "
          }
        }
      }
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;