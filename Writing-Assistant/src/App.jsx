import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ChatMode from './pages/ChatMode';
import BlogMode from './pages/BlogMode';
import EmailMode from './pages/EmailMode';
import CodeMode from './pages/CodeMode';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mode/:mode" element={<ChatMode />} />
          <Route path="/mode/blog" element={<BlogMode />} />
          <Route path="/mode/email" element={<EmailMode />} />
          <Route path="/mode/code" element={<CodeMode />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App