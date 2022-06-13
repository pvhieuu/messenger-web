import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { store } from '../../redux/store'
import { contentSelector } from '../FooterChat/selectors'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './ContentChat.module.scss'
import { listMessagesSelector } from './selectors'
import { sliceContentChat } from './slice'
import { getListMessagesThunk } from './thunks'

function ContentChat() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [typing, setTyping] = useState(false)
  const [scrollMany, setScrollMany] = useState(true)

  const chatInfo = useSelector(chatInfoSelector)
  const listMessages = useSelector(listMessagesSelector)
  const content = useSelector(contentSelector)
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

  const handleScroll = (e: any) => {
    setScrollMany(
      e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight > 10
    )
  }

  useEffect(() => {
    setScrollMany(true)
  }, [chatInfo])

  useEffect(() => {
    if (!scrollMany) {
      scrollToBottom()
    }
  }, [listMessages, typing, scrollMany])

  useEffect(() => {
    socket.emit(
      'typing',
      content.trim()
        ? { chat_id: chatInfo.guest_chat_id, value: true }
        : { chat_id: chatInfo.guest_chat_id, value: false }
    )
  }, [content, chatInfo])

  useEffect(() => {
    socket.on(`listen typing of chat: ${chatInfo.id}`, (data) => {
      setTyping(data)
    })

    return () => {
      socket.removeListener(`listen typing of chat: ${chatInfo.id}`)
    }
  }, [chatInfo])

  return (
    <ul onScroll={handleScroll} className={styles.ContentChat}>
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
      {typing && <p className={styles.typing}>Typing</p>}
      <div ref={messagesEndRef} />
    </ul>
  )
}

export default ContentChat
