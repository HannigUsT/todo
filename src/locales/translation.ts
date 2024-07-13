import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';

let pathLoad = 'src/locales/{{lng}}/translation.json';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: process.env.LANGUAGE,
    backend: {
      loadPath: `${pathLoad}`,
    },
    interpolation: { escapeValue: false },
  });

export default i18next;
