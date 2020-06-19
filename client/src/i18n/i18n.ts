import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import Fetch from 'i18next-fetch-backend';
import { BASE_URL } from 'config';


i18n.use(Fetch)
.use(LanguageDetector)
.use(initReactI18next)
.init({
        debug: true,
        ns: ['translations'],
        defaultNS: 'translations',
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain', 'querystring', 'cookie',],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            lookupFromPathIndex: 0,
            lookupFromSubdomainIndex: 0,
            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'],
        },
        // lng: 'en',
        fallbackLng: 'EN',
        partialBundledLanguages: true,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true,
            bindStore: false,
            bindI18n: 'languageChanged'
        },
        backend: {
            loadPath: BASE_URL + '/Translations/{{lng}}.json',
        }
    });

export default i18n;
