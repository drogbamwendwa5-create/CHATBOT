import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, FileText, Mail, Code, Trash2 } from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const [activeMode, setActiveMode] = useMode('chat');
  const navigate = useNavigate();

  const modes = [
    { id: 'chat', label: 'General Chat', icon: MessageCircle, description: 'Free-form conversation' },
    { id: 'blog', label: 'Blog Writer', icon: FileText, description: 'Structured blog posts' },
    { id: 'email', label: 'Email Generator', icon: Mail, description: 'Professional emails' },
    { id: 'code', label: 'Code Explainer', icon: Code, description: 'Code analysis & docs' }
  ];

  const handleModeSelect = (mode) => {
    setActiveMode(mode);
    navigate(`/mode/${mode}`);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <div className={`sidebar ${isOpen ? 'open' : ''}`} role="complementary" aria-label="Navigation sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">AI</div>
          <div className="sidebar-title">AI Assistant</div>
          <button className="sidebar-close-btn icon-btn" onClick={onClose} aria-label="Close sidebar">
            ✕
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-group">
            <div className="sidebar-group-title">Writing Modes</div>
            <nav className="sidebar-nav" aria-label="Mode navigation">
              {modes.map(mode => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    className={`sidebar-btn ${activeMode === mode.id ? 'active' : ''}`}
                    onClick={() => handleModeSelect(mode.id)}
                    type="button"
                    aria-label={mode.label}
                  >
                    <span className="sidebar-btn-icon">
                      <Icon size={22} />
                    </span>
                    <span className="sidebar-btn-label">{mode.label}</span>
                    <span className="sidebar-btn-desc">{mode.description}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
        <div className="sidebar-footer">
          <button
            className="sidebar-footer-btn"
            aria-label="Clear chat history"
            onClick={() => {
              if (window.confirm('Clear chat history?')) {
                localStorage.removeItem('chatHistory');
                window.location.reload();
              }
            }}
          >
            <span className="sidebar-footer-btn-icon">
              <Trash2 size={18} />
            </span>
            <span>Clear History</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

// Custom hook for managing active mode
function useMode(defaultMode) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('activeMode') || defaultMode;
  });

  const setActiveMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('activeMode', newMode);
  };

  return [mode, setActiveMode];
}