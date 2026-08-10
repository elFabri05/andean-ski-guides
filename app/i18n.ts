import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import de from './locales/de.json';

export const FALLBACK_LNG = 'en';
export const SUPPORTED_LNGS = ['en', 'es', 'de'] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
    },
    /**
     * Pinned rather than detected. This module is imported by a client
     * component, so it also runs during SSR -- where localStorage and navigator
     * do not exist and detection therefore always yields English. Letting the
     * browser detect at init made the client's first render disagree with the
     * server for anyone whose browser is not English, which React reports as a
     * whole-tree hydration failure. Passing `lng` makes both sides start in the
     * same language; I18nProvider applies the real one after hydration.
     */
    lng: FALLBACK_LNG,
    fallbackLng: FALLBACK_LNG,
    supportedLngs: SUPPORTED_LNGS,
    // Treat es-AR, de-CH and friends as their base language.
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      /**
       * Caching is off here and done by I18nProvider instead. i18next writes
       * the cache during init, which with a pinned `lng` meant stamping "en"
       * into localStorage before the visitor was ever detected -- the detector
       * then read its own stamp back and every new visitor stuck on English.
       */
      caches: [],
    },
  });

/** Where the visitor's language choice is remembered; i18next's default key. */
export const LANGUAGE_STORAGE_KEY = 'i18nextLng';

/**
 * The visitor's preferred language, or undefined when it cannot be determined
 * or is not one we translate. Browser-only -- returns undefined during SSR.
 */
export function detectPreferredLanguage(): string | undefined {
  const detector = i18n.services.languageDetector as
    | { detect(): string | string[] | undefined }
    | undefined;

  const detected = detector?.detect();
  const raw = Array.isArray(detected) ? detected[0] : detected;
  if (!raw) return undefined;

  const base = raw.split('-')[0];
  return (SUPPORTED_LNGS as readonly string[]).includes(base) ? base : undefined;
}

export default i18n;
