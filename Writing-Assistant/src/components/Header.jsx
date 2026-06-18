import { useTheme } from '../context/ThemeContext';
import { Menu, Moon, Sun } from 'lucide-react';

function Header({ onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header" role="banner">
      <div className="header-left">
        <button className="hamburger-btn icon-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={22} />
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
          {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
        </button>
      </div>
    </header>
  );
}

export default Header