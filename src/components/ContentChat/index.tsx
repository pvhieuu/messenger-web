import styles from './ContentChat.module.scss'

function ContentChat() {
  return (
    <ul className={styles.ContentChat}>
      <li>
        <span>Hôm nay t OT về muộn</span>
        <div className={styles.options}>
          <i className='far fa-smile'></i>
          <i className='fas fa-share'></i>
          <i className='fas fa-ellipsis-v'></i>
        </div>
      </li>
      <li className={styles.me}>
        <span>T ăn cơm trước đây chữ bị nhoè</span>
        <div className={styles.options}>
          <i className='far fa-smile'></i>
          <i className='fas fa-share'></i>
          <i className='fas fa-ellipsis-v'></i>
        </div>
      </li>
    </ul>
  )
}

export default ContentChat
