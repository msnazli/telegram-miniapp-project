import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend) // بارگذاری ترجمه‌ها از API
  .use(initReactI18next)
  .init({
    lng: 'fa',
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/api/translations/{{lng}}', // API برای بارگذاری ترجمه‌ها
      parse: (data) => {
        const json = JSON.parse(data);
        return json.values || {};
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
