import clsx from 'clsx'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, TYPE_MESSAGE } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { store } from '../../redux/store'
import { contentSelector } from '../FooterChat/selectors'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './ContentChat.module.scss'
import { listMessagesSelector, pageSelector } from './selectors'
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
  const page = useSelector(pageSelector)

  useEffect(() => {
    if (chatInfo.id.trim() && page > 0) {
      dispatch(getListMessagesThunk({ chat_id: chatInfo.id.trim(), page }))
    }
  }, [chatInfo.id, dispatch, page])

  useEffect(() => {
    socket.on(`listen message of chat: ${chatInfo.id}`, (data) => {
      dispatch(sliceContentChat.actions.listenMessage(data))
    })

    return () => {
      socket.removeListener(`listen message of chat: ${chatInfo.id}`)
    }
  }, [dispatch, chatInfo.id])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback(
    (e: any) => {
      const ulElement = e.target
      if (ulElement.scrollTop === 0) {
        dispatch(sliceContentChat.actions.setPage(page + 1))
        ulElement.scrollTop = 10
      }
      setScrollMany(
        ulElement.scrollHeight - ulElement.scrollTop - ulElement.offsetHeight >
          50
      )
    },
    [dispatch, page]
  )

  useEffect(() => {
    setScrollMany(false)
  }, [chatInfo])

  useEffect(() => {
    if (!scrollMany) {
      scrollToBottom()
    }
  }, [listMessages, typing, scrollMany, scrollToBottom])

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
      {listMessages.map((message: IMessage) => {
        const classMe = message.sender_id === chatInfo.host.id
        const classIcon = message.type === TYPE_MESSAGE.ICON
        const classConfig = message.type === TYPE_MESSAGE.CONFIG
        return (
          <li
            key={message.id}
            className={clsx(
              classMe ? styles.me : '',
              classIcon ? styles.icon : '',
              classConfig ? styles.config : ''
            )}
          >
            {(message.type === TYPE_MESSAGE.TEXT ||
              message.type === TYPE_MESSAGE.ICON ||
              message.type === TYPE_MESSAGE.CONFIG) && (
              <span
                style={{
                  backgroundColor: classMe && !classIcon && chatInfo.color,
                  color: classIcon && chatInfo.color,
                }}
              >
                {classIcon && message.content.startsWith('fa') ? (
                  <i className={message.content}></i>
                ) : (
                  message.content
                )}
              </span>
            )}
            {message.type === TYPE_MESSAGE.IMAGE && (
              <img src={message.content} loading='lazy' alt='link img' />
            )}
            {message.type === TYPE_MESSAGE.VIDEO && (
              <video preload='none' controls src={message.content}></video>
            )}
            {message.type === TYPE_MESSAGE.VOICE && (
              <audio preload='none' controls>
                <source src={message.content} />
              </audio>
            )}
            {message.type !== TYPE_MESSAGE.ICON &&
              message.type !== TYPE_MESSAGE.CONFIG && (
                <div className={styles.options}>
                  <i className='far fa-smile'></i>
                  <i className='fas fa-share'></i>
                  <i className='fas fa-ellipsis-v'></i>
                </div>
              )}
          </li>
        )
      })}
      {typing && <p className={styles.typing}>Typing</p>}
      <div ref={messagesEndRef} />
    </ul>
  )
}

export default memo(ContentChat)
