import styles from './HeaderChat.module.scss'

function HeaderChat() {
  return (
    <div className={styles.HeaderChat}>
      <div className={styles.left}>
        <img src={require('../../assets/img/avatar.png')} alt='avatar' />
        <span>Nguyễn Văn Vinh</span>
      </div>
      <div className={styles.right}>
        <i className='fas fa-phone-alt'></i>
        <i className='fas fa-video'></i>
        <i className='fas fa-ellipsis-h'></i>
      </div>
    </div>
  )
}

export default HeaderChat
