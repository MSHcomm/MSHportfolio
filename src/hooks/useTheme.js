import { useState, useEffect } from 'react';
import { getTheme } from '../stores/themeStore';

export function useTheme() {
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    const handler = (e) => setTheme(e.detail);
    document.addEventListener('themechange', handler);
    return () => document.removeEventListener('themechange', handler);
  }, []);

  return theme;
}
