import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/common.json';
import fr from '../locales/fr/common.json';
import ar from '../locales/ar/common.json';

const savedLang = localStorage.getItem('portfolio-lang');
const browserLang = navigator.language.split('-')[0];

const supportedLanguages = ['en', 'fr', 'ar'];
const defaultLanguage = 'en';

let detectedLanguage = defaultLanguage;

if (savedLang && supportedLanguages.includes(savedLang)) {
  detectedLanguage = savedLang;
} else if (supportedLanguages.includes(browserLang)) {
  detectedLanguage = browserLang;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: detectedLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('portfolio-lang', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

document.documentElement.dir = detectedLanguage === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = detectedLanguage;

export default i18n;
