import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { Bot, Copy } from 'lucide-react'

/**
 * MessageList displays an array of message objects.
 * Bot messages are rendered as markdown for rich formatting.
 * Each message fades in using Framer Motion and includes a copy‑to‑clipboard button.
 *
 * Scrolling is fully manual — the user scrolls freely through the entire chat.
 */
function MessageList({ messages }) {
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="message-list">
      {messages && messages.length === 0 && (
        <div className="empty-state fade-in">
          <div className="empty-state-icon">
            <Bot size={64} />
          </div>
          <h2 className="text-gradient">AI Writing Assistant</h2>
          <p>Start a conversation with your AI assistant. Choose a mode from the sidebar or simply type your message below.</p>
        </div>
      )}
      {messages && messages.map((message) => (
        <motion.div
          key={message.id}
          className={`message ${message.sender}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {message.sender === 'bot' && (
            <div className="avatar bot">
              <Bot size={20} />
            </div>
          )}
          <div className="message-content">
            {message.sender === 'bot' ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
              <span>{message.text}</span>
            )}
            <div className="message-time">{formatTime()}</div>
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(message.text)}
              aria-label="Copy message"
            >
              <Copy size={14} />
              <span>Copy</span>
            </button>
          </div>
          {message.sender === 'user' && (
            <div className="avatar user">You</div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default MessageList