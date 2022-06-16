import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMOJI } from '../../constants'
import { createDtoSendMessage, isKeySpace } from '../../helpers'
import { TYPE_MESSAGE } from '../../interfaces'
import { store } from '../../redux/store'
import { sendingSelector } from '../ContentChat/selectors'
import { sendMessageThunk } from '../ContentChat/thunks'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './FooterChat.module.scss'
import { contentSelector } from './selectors'
import { sliceFooterChat } from './slice'

function FooterChat() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [showEmojiModal, setShowEmojiModal] = useState(false)

  const content = useSelector(contentSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const sending = useSelector(sendingSelector)

  const handleSendMessage = () => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(content, TYPE_MESSAGE.TEXT, chatInfo)
      )
    )
    dispatch(sliceFooterChat.actions.setContent(''))
    inputRef.current?.focus()
  }

  window.onkeydown = (e) => {
    if (e.key === 'Enter' && content.trim()) {
      handleSendMessage()
    }
  }

  const handleSendMainIcon = () => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(chatInfo.emoji, TYPE_MESSAGE.ICON, chatInfo)
      )
    )
    inputRef.current?.focus()
  }

  window.onclick = () => {
    if (showEmojiModal) {
      setShowEmojiModal(false)
    }
  }

  const handleSendEmoji = (emoji: string) => {
    dispatch(
      sendMessageThunk(createDtoSendMessage(emoji, TYPE_MESSAGE.ICON, chatInfo))
    )
    setShowEmojiModal(false)
  }

  return (
    <div className={styles.FooterChat}>
      {sending && <p>Sending...</p>}
      <i style={{ color: chatInfo.color }} className='fas fa-plus-circle'></i>
      <i style={{ color: chatInfo.color }} className='far fa-image'></i>
      <i style={{ color: chatInfo.color }} className='fas fa-microphone'></i>
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
        <i
          onClick={(e) => {
            setShowEmojiModal(!showEmojiModal)
            e.stopPropagation()
          }}
          style={{ color: chatInfo.color }}
          className='fas fa-smile'
        ></i>
        {showEmojiModal && (
          <ul onClick={(e) => e.stopPropagation()}>
            {EMOJI.map((emoji) => (
              <li key={emoji} onClick={() => handleSendEmoji(emoji)}>
                {emoji}
              </li>
            ))}
          </ul>
        )}
      </div>
      {content.trim() ? (
        <i
          onClick={handleSendMessage}
          style={{ color: chatInfo.color }}
          className='fas fa-paper-plane'
        ></i>
      ) : (
        <i
          onClick={handleSendMainIcon}
          style={{ color: chatInfo.color }}
          className={chatInfo.emoji}
        ></i>
      )}
    </div>
  )
}

export default FooterChat
