import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../context/ThemeContext'

const BlogMode = () => {
  const { theme } = useTheme()

  return (
    <div className={`home ${theme}`}>
      <Header />
      <div className="content">
        <Sidebar />
        <ChatBox mode="blog" />
      </div>
    </div>
  )
}

export default BlogMode