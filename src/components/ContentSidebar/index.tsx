import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IChat, IDeleteChatDto, IUser } from '../../interfaces'
import { store } from '../../redux/store'
import { sliceFooterChat } from '../FooterChat/slice'
import { sliceHeaderChat } from '../HeaderChat/slice'
import {
  myInfoSelector,
  showSearchUsersSelector,
} from '../HeaderSidebar/selectors'
import { sliceHeaderSidebar } from '../HeaderSidebar/slice'
import styles from './ContentSidebar.module.scss'
import { listChatsSelector, listUsersSelector } from './selectors'
import {
  createNewChatThunk,
  deleteChatThunk,
  getListChatsThunk,
  updateReadedThunk,
} from './thunks'
import moment from 'moment'
import {
  lastMessageSelector,
  newGuestChatSelector,
} from '../ContentChat/selectors'
import { sliceContentSidebar } from './slice'
import { socket } from '../../pages/Dashboard'
import {
  chatInfoSelector,
  updatedBackgroundColorSelector,
  updatedColorSelector,
  updatedEmojiSelector,
  updatedNicknameSelector,
} from '../HeaderChat/selectors'

function ContentSidebar() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [showOptions, setShowOptions] = useState<string[]>([])
  const [refreshTime, setRefreshTime] = useState(Math.random())

  const showSearchUsers = useSelector(showSearchUsersSelector)
  const listChats = useSelector(listChatsSelector)
  const listUsers = useSelector(listUsersSelector)
  const myInfo = useSelector(myInfoSelector)
  const lastMessage = useSelector(lastMessageSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const newGuestChat = useSelector(newGuestChatSelector)
  const udpatedNickname = useSelector(updatedNicknameSelector)
  const updatedColor = useSelector(updatedColorSelector)
  const updatedBackgroundColor = useSelector(updatedBackgroundColorSelector)
  const updatedEmoji = useSelector(updatedEmojiSelector)

  useEffect(() => {
    if (Object.keys(udpatedNickname).length > 0) {
      dispatch(
        sliceContentSidebar.actions.updateNickname({
          chat_id: chatInfo.id,
          data: udpatedNickname,
        })
      )
      dispatch(sliceHeaderChat.actions.updateNickname({}))
    }
  }, [udpatedNickname, dispatch, chatInfo])

  useEffect(() => {
    if (updatedColor) {
      dispatch(
        sliceContentSidebar.actions.updateColor({
          chat_id: chatInfo.id,
          color: updatedColor,
        })
      )
      dispatch(sliceHeaderChat.actions.updateColor(null))
    }
  }, [updatedColor, dispatch, chatInfo])

  useEffect(() => {
    if (updatedBackgroundColor) {
      dispatch(
        sliceContentSidebar.actions.updateBackgroundColor({
          chat_id: chatInfo.id,
          background_color: updatedBackgroundColor,
        })
      )
      dispatch(sliceHeaderChat.actions.updateBackgroundColor(null))
    }
  }, [updatedBackgroundColor, dispatch, chatInfo])

  useEffect(() => {
    if (updatedEmoji) {
      dispatch(
        sliceContentSidebar.actions.updateEmoji({
          chat_id: chatInfo.id,
          emoji: updatedEmoji,
        })
      )
      dispatch(sliceHeaderChat.actions.updateEmoji(null))
    }
  }, [updatedEmoji, dispatch, chatInfo])

  useEffect(() => {
    dispatch(getListChatsThunk())
  }, [dispatch])

  useEffect(() => {
    const id = setInterval(() => {
      setRefreshTime(Math.random())
    }, 1000 * 3)

    return () => {
      clearInterval(id)
    }
  }, [])

  const handleCreateNewChat = (guest_id: string) => {
    dispatch(createNewChatThunk({ guest_id }))
    dispatch(sliceHeaderSidebar.actions.setShowSearchUsers(false))
    dispatch(sliceHeaderSidebar.actions.setContentSearch(''))
    listChats.forEach((chat: IChat) => {
      chat.guest.id === guest_id && handleOpenChat(chat)
    })
  }

  const handleDeleteChat = (deleteChatDto: IDeleteChatDto) => {
    dispatch(deleteChatThunk(deleteChatDto))
    if (deleteChatDto.chat_id === chatInfo.id) {
      dispatch(sliceHeaderChat.actions.setChatInfo(null))
    }
  }

  const handleOpenChat = (chat: IChat) => {
    dispatch(sliceHeaderChat.actions.setChatInfo(chat))
    dispatch(sliceFooterChat.actions.setContent(''))
    dispatch(updateReadedThunk({ chat_id: chat.id }))
  }

  useEffect(() => {
    if (lastMessage) {
      dispatch(sliceContentSidebar.actions.updateLastMessage(lastMessage))
    }
  }, [lastMessage, dispatch])

  useEffect(() => {
    socket.on(`listen chat of user: ${myInfo.id}`, (data) => {
      dispatch(sliceContentSidebar.actions.listenChat(data))
    })

    return () => {
      socket.removeListener(`listen chat of user: ${myInfo.id}`)
    }
  }, [dispatch, myInfo.id])

  useEffect(() => {
    socket.on(`listen last message of user: ${myInfo.id}`, (data) => {
      dispatch(sliceContentSidebar.actions.updateLastMessage(data))
      dispatch(
        sliceContentSidebar.actions.updateReaded({
          chat_id: data.chat_id,
          readed: false,
        })
      )
      data.chat_id === chatInfo?.id &&
        dispatch(updateReadedThunk({ chat_id: data.chat_id }))
      new Audio(
        'http://freesoundeffect.net/sites/default/files/social-media-alert-sound-effect-65341187.mp3'
      ).play()
    })

    return () => {
      socket.removeListener(`listen last message of user: ${myInfo.id}`)
    }
  }, [dispatch, myInfo.id, chatInfo])

  useEffect(() => {
    socket.on(`listen delete chat of user: ${myInfo.id}`, (data) => {
      dispatch(
        sliceContentSidebar.actions.updateGuestChatId({
          chat_id: data.chat_id,
          guest_chat_id: null,
        })
      )
      dispatch(sliceHeaderChat.actions.updateGuestChatId(null))
    })

    return () => {
      socket.removeListener(`listen delete chat of user: ${myInfo.id}`)
    }
  }, [dispatch, myInfo.id])

  useEffect(() => {
    if (newGuestChat) {
      dispatch(
        sliceContentSidebar.actions.updateGuestChatId({
          chat_id: newGuestChat.guest_chat_id,
          guest_chat_id: newGuestChat.id,
        })
      )
      dispatch(sliceHeaderChat.actions.updateGuestChatId(newGuestChat.id))
    }
  }, [dispatch, newGuestChat])

  useEffect(() => {
    socket.on(
      `listen update guest_chat_id of user: ${myInfo.id}`,
      (data: IChat) => {
        dispatch(
          sliceContentSidebar.actions.updateGuestChatId({
            chat_id: data.guest_chat_id,
            guest_chat_id: data.id,
          })
        )
        dispatch(sliceHeaderChat.actions.updateGuestChatId(data.id))
      }
    )

    return () => {
      socket.removeListener(`listen update guest_chat_id of user: ${myInfo.id}`)
    }
  }, [dispatch, myInfo.id])

  useEffect(() => {
    socket.on(`listen change chat color of user: ${myInfo.id}`, (data) => {
      dispatch(
        sliceContentSidebar.actions.updateColor({
          chat_id: data.chat_id,
          color: data.color,
        })
      )
      if (chatInfo?.id && data.chat_id === chatInfo.id) {
        dispatch(sliceHeaderChat.actions.updateColorChatInfo(data.color))
      }
    })

    return () => {
      socket.removeListener(`listen change chat color of user: ${myInfo.id}`)
    }
  }, [myInfo.id, dispatch, chatInfo])

  useEffect(() => {
    socket.on(
      `listen change chat background color of user: ${myInfo.id}`,
      (data) => {
        dispatch(
          sliceContentSidebar.actions.updateBackgroundColor({
            chat_id: data.chat_id,
            background_color: data.background_color,
          })
        )
        if (chatInfo?.id && data.chat_id === chatInfo.id) {
          dispatch(
            sliceHeaderChat.actions.updateBackgroundColorChatInfo(
              data.background_color
            )
          )
        }
      }
    )

    return () => {
      socket.removeListener(
        `listen change chat background color of user: ${myInfo.id}`
      )
    }
  }, [myInfo.id, dispatch, chatInfo])

  useEffect(() => {
    socket.on(`listen change chat emoji of user: ${myInfo.id}`, (data) => {
      dispatch(
        sliceContentSidebar.actions.updateEmoji({
          chat_id: data.chat_id,
          emoji: data.emoji,
        })
      )
      if (chatInfo?.id && data.chat_id === chatInfo.id) {
        dispatch(sliceHeaderChat.actions.updateEmojiChatInfo(data.emoji))
      }
    })

    return () => {
      socket.removeListener(`listen change chat emoji of user: ${myInfo.id}`)
    }
  }, [myInfo.id, dispatch, chatInfo])

  useEffect(() => {
    socket.on(`listen change chat nickname of user: ${myInfo.id}`, (data) => {
      const updated_nickname = {
        nickname_host: data.updated_nickname.nickname_guest,
        nickname_guest: data.updated_nickname.nickname_host,
      }
      dispatch(
        sliceContentSidebar.actions.updateNickname({
          chat_id: data.chat_id,
          data: updated_nickname,
        })
      )
      if (chatInfo?.id && data.chat_id === chatInfo.id) {
        dispatch(
          sliceHeaderChat.actions.updateNicknameChatInfo(updated_nickname)
        )
      }
    })

    return () => {
      socket.removeListener(`listen change chat nickname of user: ${myInfo.id}`)
    }
  }, [dispatch, myInfo, chatInfo])

  return !showSearchUsers ? (
    <ul className={styles.ContentSidebar}>
      {listChats.map((chat: IChat) => {
        const existingId = showOptions.includes(chat.id)
        return (
          <Fragment key={chat.id}>
            <li
              onClick={() => handleOpenChat(chat)}
              className={clsx(
                chat.readed ? '' : styles.unread,
                chatInfo?.id === chat.id ? styles.active : ''
              )}
            >
              <img
                src={
                  chat.guest.avatar
                    ? chat.guest.avatar
                    : require('../../assets/img/avatar.png')
                }
                alt='avatar'
              />
              <div className={styles.containerInfo}>
                <p>
                  {chat.nickname_guest
                    ? chat.nickname_guest
                    : chat.guest.fullname}
                </p>
                {chat?.last_message && chat.last_message[0] && (
                  <div className={styles.lastMessage}>
                    <span>{`${
                      chat.last_message[0].sender_id === myInfo.id
                        ? 'You: '
                        : ''
                    }${
                      chat.last_message[0].content.startsWith('fa')
                        ? 'icons'
                        : chat.last_message[0].content
                    }`}</span>
                    <span>{`- ${moment(chat.last_message[0].created_at)
                      .fromNow()
                      .replace(' ago', '')
                      .replace('a few', '')}`}</span>
                  </div>
                )}
              </div>
              <i
                onClick={(e) => {
                  e.stopPropagation()
                  existingId
                    ? setShowOptions((prev) =>
                        prev.filter((id: string) => id !== chat.id)
                      )
                    : setShowOptions([...showOptions, chat.id])
                }}
                className={clsx(
                  'far fa-angle-down',
                  existingId ? styles.rotate : ''
                )}
              ></i>
            </li>
            {existingId && (
              <ul>
                <li>
                  <i className='far fa-check'></i>
                  <span>Đánh dấu là chưa đọc</span>
                </li>
                <li>
                  <i className='fas fa-bell'></i>
                  <span>Tắt thông báo</span>
                </li>
                <li>
                  <i className='fas fa-user'></i>
                  <span>Xem trang cá nhân</span>
                </li>
                <li>
                  <i className='fas fa-phone-alt'></i>
                  <span>Gọi thoại</span>
                </li>
                <li>
                  <i className='fas fa-video'></i>
                  <span>Chat video</span>
                </li>
                <li>
                  <i className='fas fa-archive'></i>
                  <span>Lưu trữ đoạn chat</span>
                </li>
                <li
                  onClick={() =>
                    handleDeleteChat({
                      chat_id: chat.id,
                      guest_chat_id: chat.guest_chat_id,
                      guest_id: chat.guest.id,
                    })
                  }
                >
                  <i className='fas fa-trash'></i>
                  <span>Xoá đoạn chat</span>
                </li>
                <li>
                  <i className='fas fa-exclamation-circle'></i>
                  <span>Báo cáo</span>
                </li>
              </ul>
            )}
          </Fragment>
        )
      })}
      {refreshTime && ''}
    </ul>
  ) : (
    <ul className={styles.ContentSearch}>
      {listUsers.map((user: IUser) => (
        <li
          onClick={() => handleCreateNewChat(user.id)}
          key={user.id}
          className={user.status_online ? styles.online : ''}
        >
          <img
            src={
              user.avatar ? user.avatar : require('../../assets/img/avatar.png')
            }
            alt='avatar'
          />
          <span>{user.fullname}</span>
        </li>
      ))}
    </ul>
  )
}

export default ContentSidebar
