import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const ChatMode = () => {
  const { theme } = useTheme()

  return (
    <div className={`home ${theme}`}>
      <Header />
      <div className="content">
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  )
}

export default ChatMode