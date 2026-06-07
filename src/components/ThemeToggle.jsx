import { useTheme } from '../hooks/useTheme';
import { setTheme } from '../stores/themeStore';

export default function ThemeToggle() {
  const theme = useTheme();

  function toggle() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
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
