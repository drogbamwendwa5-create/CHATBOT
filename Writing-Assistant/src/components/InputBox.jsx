import { useState } from 'react'
import { SendHorizonal } from 'lucide-react'

/**
 * InputBox renders a text input and calls onSend with the entered value.
 */
function InputBox({ onSend }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      onSend && onSend(trimmed)
      setInput('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="input-box"
      role="search"
      aria-label="Chat input"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        aria-label="Message input"
      />
      <button type="submit" className="send-btn" aria-label="Send message">
        <SendHorizonal size={22} />
      </button>
    </form>
  )
}

export default InputBox