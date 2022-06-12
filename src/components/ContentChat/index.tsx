import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { store } from '../../redux/store'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './ContentChat.module.scss'
import { listMessagesSelector } from './selectors'
import { sliceContentChat } from './slice'
import { getListMessagesThunk } from './thunks'

function ContentChat() {
  const dispatch = useDispatch<typeof store.dispatch>()

  const chatInfo = useSelector(chatInfoSelector)
  const listMessages = useSelector(listMessagesSelector)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatInfo.id.trim()) {
      dispatch(getListMessagesThunk(chatInfo.id.trim()))
    }
  }, [chatInfo, dispatch])

  useEffect(() => {
    socket.on(`listen message of chat: ${chatInfo.id}`, (data) => {
      dispatch(sliceContentChat.actions.listenMessage(data))
    })

    return () => {
      socket.removeListener(`listen message of chat: ${chatInfo.id}`)
    }
  }, [dispatch, chatInfo.id])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [listMessages])

  return (
    <ul className={styles.ContentChat}>
      {listMessages.map((message: IMessage) => (
        <li
          key={message.id}
          className={message.sender_id === chatInfo.host.id ? styles.me : ''}
        >
          <span>{message.content}</span>
          <div className={styles.options}>
            <i className='far fa-smile'></i>
            <i className='fas fa-share'></i>
            <i className='fas fa-ellipsis-v'></i>
          </div>
        </li>
      ))}
      <div ref={messagesEndRef} />
    </ul>
  )
}

export default ContentChat
