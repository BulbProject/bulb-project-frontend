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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    defaultNS: 'common',
    ns: ['common'],
    returnEmptyString: false,

    detection: {
      order: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  // eslint-disable-next-line no-console
  .catch(console.error);

i18n.services.pluralResolver.addRule('ua', {
  name: 'Ukrainian',
  numbers: [0, 1, 2],
  plurals(n: number) {
    if (n % 10 === 1 && n % 100 !== 11) {
      return 0;
    }
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      return 1;
    }

    return 2;
  },
});

export default i18n;
