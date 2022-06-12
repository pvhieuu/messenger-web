import { useDispatch, useSelector } from 'react-redux'
import styles from './HeaderChat.module.scss'
import { chatInfoSelector, showChatInfoSelector } from './selectors'
import { sliceHeaderChat } from './slice'

function HeaderChat() {
  const dispatch = useDispatch()

  const showChatInfo = useSelector(showChatInfoSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const { guest } = chatInfo

  return (
    <div className={styles.HeaderChat}>
      <div className={styles.left}>
        <img
          src={
            guest.avatar ? guest.avatar : require('../../assets/img/avatar.png')
          }
          alt='avatar'
        />
        <span>{guest.fullname}</span>
      </div>
      <div className={styles.right}>
        <i className='fas fa-phone-alt'></i>
        <i className='fas fa-video'></i>
        <i
          onClick={() =>
            dispatch(sliceHeaderChat.actions.setShowChatInfo(!showChatInfo))
          }
          className='fas fa-ellipsis-h'
        ></i>
      </div>
    </div>
  )
}

export default HeaderChat
