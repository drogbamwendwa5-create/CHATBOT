import { useTheme } from '../context/ThemeContext';

function Header({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button className="hamburger-btn icon-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          ☰
        </button>
        <div className="header-logo">AI</div>
        <div>
          <div className="header-title">AI Writing Assistant</div>
          <div className="header-subtitle">Powered by intelligent AI</div>
        </div>
      </div>
      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle light/dark theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Header
