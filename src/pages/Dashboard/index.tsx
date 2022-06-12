import { useSelector } from 'react-redux'
import ChatInfo from '../../components/ChatInfo'
import ContentChat from '../../components/ContentChat'
import ContentSidebar from '../../components/ContentSidebar'
import FooterChat from '../../components/FooterChat'
import FooterSidebar from '../../components/FooterSidebar'
import HeaderChat from '../../components/HeaderChat'
import {
  chatInfoSelector,
  showChatInfoSelector,
} from '../../components/HeaderChat/selectors'
import HeaderSidebar from '../../components/HeaderSidebar'
import styles from './Dashboard.module.scss'
import { io } from 'socket.io-client'
import { url } from '../../api'

export const socket = io(url)

function Dashboard() {
  const showChatInfo = useSelector(showChatInfoSelector)
  const chatInfo = useSelector(chatInfoSelector)

  return (
    <div className={styles.Dashboard}>
      <div className={styles.sidebar}>
        <HeaderSidebar />
        <ContentSidebar />
        <FooterSidebar />
      </div>
      {chatInfo && (
        <div className={styles.main}>
          <div className={styles.chat}>
            <HeaderChat />
            <ContentChat />
            <FooterChat />
          </div>
          {showChatInfo && <ChatInfo />}
        </div>
      )}
    </div>
  )
}

export default Dashboard
