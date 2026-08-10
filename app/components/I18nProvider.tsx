'use client';

import { useEffect } from 'react';
import i18n, { detectPreferredLanguage, LANGUAGE_STORAGE_KEY } from '../i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Runs for every language change, from detection below or the selector:
    // keep <html lang> honest (the server renders it as "en"), and remember the
    // language for next visit. Persisting here rather than via the detector's
    // own cache keeps init from stamping the pinned "en" over a real choice.
    const onLanguageChanged = (lng: string) => {
      document.documentElement.lang = lng;
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    };
    i18n.on('languageChanged', onLanguageChanged);

    // Detection runs here rather than at init: by now hydration has committed,
    // so switching language re-renders instead of contradicting the server.
    const preferred = detectPreferredLanguage();
    if (preferred && preferred !== i18n.resolvedLanguage) {
      i18n.changeLanguage(preferred);
    }

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  return <>{children}</>;
}
