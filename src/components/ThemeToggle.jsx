import { useState, useEffect } from 'react';
import { getTheme, setTheme } from '../stores/themeStore';

export default function ThemeToggle() {
  const [theme, setT] = useState(() => getTheme());

  useEffect(() => {
    const handler = (e) => setT(e.detail);
    document.addEventListener('themechange', handler);
    return () => document.removeEventListener('themechange', handler);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setT(next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '28px',
        background: 'transparent',
        border: '1px solid var(--card-border)',
        borderRadius: '6px',
        cursor: 'pointer',
        color: 'var(--primary)',
        outline: 'none',
        transition: 'border-color 150ms, background 150ms',
        flexShrink: 0,
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
}
