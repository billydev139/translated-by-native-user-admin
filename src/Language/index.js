import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './en/translation.json';
import frTranslation from './fr/translation.json';
import itTranslation from './it/translation.json';
import jaTranslation from './ja/translation.json';
import zhTranslation from './zh/translation.json';
import arTranslation from './ar/translation.json';
import spTranslation from './sp/translation.json';
import deTranslation from './de/translation.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    resources: {
      en: { translation: enTranslation },
      sp : { translation: spTranslation },
      fr: { translation: frTranslation },
      it: { translation: itTranslation },
      ja: { translation: jaTranslation },
      zh: { translation: zhTranslation },
      ar: { translation: arTranslation },
      de: { translation: deTranslation },
    },
    lng: 'it', // Default language
    fallbackLng: 'en', // Use English if the chosen language is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
