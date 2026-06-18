import { useState } from 'react'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const ChatMode = () => {
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`home ${theme}`}>
      <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
      <div className="content">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatMode
