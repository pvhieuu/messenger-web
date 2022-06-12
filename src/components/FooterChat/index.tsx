import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isKeySpace } from '../../helpers'
import { ICreateMessageDto, TYPE_MESSAGE } from '../../interfaces'
import { store } from '../../redux/store'
import { sendingSelector } from '../ContentChat/selectors'
import { sendMessageThunk } from '../ContentChat/thunks'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './FooterChat.module.scss'
import { contentSelector } from './selectors'
import { sliceFooterChat } from './slice'

function FooterChat() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const content = useSelector(contentSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const sending = useSelector(sendingSelector)

  const handleSendMessage = () => {
    const createMessageDto: ICreateMessageDto = {
      content: content.trim(),
      type: TYPE_MESSAGE.TEXT,
      chat_id: chatInfo.id,
      guest_chat_id: chatInfo.guest_chat_id,
      guest_id: chatInfo.guest.id,
    }
    dispatch(sendMessageThunk(createMessageDto))
    dispatch(sliceFooterChat.actions.setContent(''))
    inputRef.current?.focus()
  }

  window.onkeydown = (e) => {
    if (e.key === 'Enter' && content.trim()) {
      handleSendMessage()
    }
  }

  return (
    <div className={styles.FooterChat}>
      {sending && <p>Sending...</p>}
      <i className='fas fa-plus-circle'></i>
      <i className='far fa-image'></i>
      <i className='fas fa-microphone'></i>
      <div className={styles.containerInput}>
        <input
          ref={inputRef}
          type='text'
          placeholder='Aa'
          value={content}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              dispatch(sliceFooterChat.actions.setContent(e.target.value))
            }
          }}
        />
        <i className='fas fa-smile'></i>
      </div>
      {content.trim() ? (
        <i onClick={handleSendMessage} className='fas fa-paper-plane'></i>
      ) : (
        <i className='fas fa-thumbs-up'></i>
      )}
    </div>
  )
}

export default FooterChat
