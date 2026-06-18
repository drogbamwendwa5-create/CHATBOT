import { useState, useEffect, useRef } from 'react'
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

  // Ref to the bottom of the message list for auto‑scrolling
  const bottomRef = useRef(null)

  // Save messages whenever they change
  useEffect(() => {
    saveToLocalStorage(storageKey, messages)
    // Scroll to the newest message whenever the list changes
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
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

  const modeLabels = {
    chat: '💬 General Chat',
    blog: '📝 Blog Writer',
    email: '📧 Email Generator',
    code: '💻 Code Explainer'
  }

  return (
    <div className="chatbox">
      <div className="chat-header">
        <div className="chat-title">{modeLabels[mode] || modeLabels.chat}</div>
        <div className="chat-status">
          <span className="chat-status-dot"></span>
          <span>AI Online</span>
        </div>
      </div>
      <MessageList messages={messages} bottomRef={bottomRef} />
      {loading && <Loading />}
      {messages.length === 0 && <PromptTemplates onSelect={handleTemplateSelect} />}
      {/* Scrolling is handled by the dummy element inside MessageList */}
      <InputBox onSend={handleSend} />
    </div>
  )
}

export default ChatBox