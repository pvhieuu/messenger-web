import ChatInfo from '../../components/ChatInfo'
import ContentChat from '../../components/ContentChat'
import ContentSidebar from '../../components/ContentSidebar'
import FooterChat from '../../components/FooterChat'
import FooterSidebar from '../../components/FooterSidebar'
import HeaderChat from '../../components/HeaderChat'
import HeaderSidebar from '../../components/HeaderSidebar'
import styles from './Dashboard.module.scss'

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <div className={styles.sidebar}>
        <HeaderSidebar />
        <ContentSidebar />
        <FooterSidebar />
      </div>
      <div className={styles.main}>
        <div className={styles.chat}>
          <HeaderChat />
          <ContentChat />
          <FooterChat />
        </div>
        <ChatInfo />
      </div>
    </div>
  )
}

export default Dashboard
