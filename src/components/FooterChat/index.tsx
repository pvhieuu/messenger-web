import styles from './FooterChat.module.scss'

function FooterChat() {
  return (
    <div className={styles.FooterChat}>
      <i className='fas fa-plus-circle'></i>
      <i className='far fa-image'></i>
      <i className='fas fa-microphone'></i>
      <div className={styles.containerInput}>
        <input type='text' placeholder='Aa' />
        <i className='fas fa-smile'></i>
      </div>
      <i className='fas fa-thumbs-up'></i>
    </div>
  )
}

export default FooterChat
