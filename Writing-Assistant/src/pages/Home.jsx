import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import { useTheme } from '../context/ThemeContext'

function Home() {
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

export default Home