import { useState, useEffect } from 'react';
import { getLanguage } from '../stores/languageStore';

export function useLanguage() {
  const [lang, setLang] = useState(() => getLanguage());

  useEffect(() => {
    const handler = (e) => setLang(e.detail);
    document.addEventListener('langchange', handler);
    return () => document.removeEventListener('langchange', handler);
  }, []);

  return lang;
}
