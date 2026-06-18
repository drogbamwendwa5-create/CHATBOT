import { useState, useEffect } from 'react'
import { MessageCircle, FileText, Mail, Code } from 'lucide-react'
import MessageList from './MessageList'
import InputBox from './InputBox'
import Loading from './Loading'
import PromptTemplates from './PromptTemplates'
import { sendMessage } from '../services/aiService'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/storage'

/**
 * ChatBox component handles the conversation UI.
 * It supports different modes (chat, blog, email, code) and persists
 * the chat history in localStorage under a key that includes the mode.
 */
function ChatBox({ mode = 'chat' }) {
  const storageKey = `chatHistory_${mode}`
  const [messages, setMessages] = useState(() => {
    const saved = getFromLocalStorage(storageKey)
    return saved || []
  })
  const [loading, setLoading] = useState(false)

  // Save messages whenever they change
  useEffect(() => {
    saveToLocalStorage(storageKey, messages)
  }, [messages, storageKey])

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg])
  }

  const handleSend = async (userInput) => {
    if (!userInput) return
    // Add user message
    const userMsg = { id: Date.now(), text: userInput, sender: 'user' }
    addMessage(userMsg)

    // Prepare AI request messages (including previous context)
    const aiMessages = messages
      .filter((m) => m.sender !== 'loading')
      .map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
    aiMessages.push({ role: 'user', content: userInput })

    setLoading(true)
    const result = await sendMessage(aiMessages)
    setLoading(false)
    const botMsg = {
      id: Date.now() + 1,
      text: result.response,
      sender: 'bot',
    }
    addMessage(botMsg)
  }

  const handleTemplateSelect = (templateLabel) => {
    handleSend(templateLabel)
  }

  const modeIcons = {
    chat: <MessageCircle size={22} />,
    blog: <FileText size={22} />,
    email: <Mail size={22} />,
    code: <Code size={22} />,
  }

  const modeLabels = {
    chat: 'General Chat',
    blog: 'Blog Writer',
    email: 'Email Generator',
    code: 'Code Explainer'
  }

  return (
    <div className="chatbox">
      <div className="chat-header">
        <div className="chat-title">
          <span className="chat-mode-icon">{modeIcons[mode] || modeIcons.chat}</span>
          <span>{modeLabels[mode] || modeLabels.chat}</span>
        </div>
        <div className="chat-status">
          <span className="chat-status-dot"></span>
          <span>AI Online</span>
        </div>
      </div>
      <MessageList messages={messages} />
      {loading && <Loading />}
      {messages.length === 0 && <PromptTemplates onSelect={handleTemplateSelect} />}
      <InputBox onSend={handleSend} />
    </div>
  )
}

export default ChatBox