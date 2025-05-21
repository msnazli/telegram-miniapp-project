import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fa: {
    translation: {
      title: 'فرم سفارش متن',
      submit: 'ساخت متن',
      reset: 'خالی کردن فرم',
      success: 'فرم با موفقیت ارسال شد!',
      error: 'خطا در ارسال فرم',
      copied: 'متن کپی شد!',
      preview: 'پیش‌نمایش',
    },
  },
  en: {
    translation: {
      title: 'Text Request Form',
      submit: 'Generate Text',
      reset: 'Reset Form',
      success: 'Form submitted successfully!',
      error: 'Error submitting form',
      copied: 'Text copied!',
      preview: 'Preview',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fa',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
