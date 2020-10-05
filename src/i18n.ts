import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],
    debug: process.env.NODE_ENV === 'development',
    detection: {
      order: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  // eslint-disable-next-line no-console
  .catch(console.error);

export default i18n;
