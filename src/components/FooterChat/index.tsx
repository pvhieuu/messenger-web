import { memo, useCallback, useEffect, useRef, useState } from 'react'
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
  const [linkImage, setLinkImage] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [linkAudio, setLinkAudio] = useState('')
  const [valueInput, setValueInput] = useState('')

  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const content = useSelector(contentSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const sending = useSelector(sendingSelector)

  useEffect(() => {
    if (linkImage.trim()) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(linkImage.trim(), TYPE_MESSAGE.IMAGE, chatInfo)
        )
      )
      setLinkImage('')
    }
  }, [linkImage, dispatch, chatInfo])

  useEffect(() => {
    if (linkVideo.trim()) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(linkVideo.trim(), TYPE_MESSAGE.VIDEO, chatInfo)
        )
      )
      setLinkVideo('')
    }
  }, [linkVideo, dispatch, chatInfo])

  useEffect(() => {
    if (linkAudio.trim()) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(linkAudio.trim(), TYPE_MESSAGE.VOICE, chatInfo)
        )
      )
      setLinkAudio('')
    }
  }, [linkAudio, dispatch, chatInfo])

  const handleSendMessage = useCallback(() => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(content, TYPE_MESSAGE.TEXT, chatInfo)
      )
    )
    dispatch(sliceFooterChat.actions.setContent(''))
    inputRef.current?.focus()
  }, [dispatch, content, chatInfo])

  window.onkeydown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && content.trim()) {
        handleSendMessage()
      }
    },
    [content, handleSendMessage]
  )

  const handleSendMainIcon = useCallback(() => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(chatInfo.emoji, TYPE_MESSAGE.ICON, chatInfo)
      )
    )
    inputRef.current?.focus()
  }, [dispatch, chatInfo])

  window.onclick = useCallback(() => {
    if (showEmojiModal) {
      setShowEmojiModal(false)
    }
  }, [showEmojiModal])

  const handleSendEmoji = useCallback(
    (emoji: string) => {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(emoji, TYPE_MESSAGE.ICON, chatInfo)
        )
      )
      setShowEmojiModal(false)
    },
    [dispatch, chatInfo]
  )

  const handleChangeFile = useCallback((e: any) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('image')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkImage(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkImage('')
        }
      }
      if (file.type.startsWith('video')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkVideo(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkVideo('')
        }
      }
      if (file.type.startsWith('audio')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkAudio(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkAudio('')
        }
      }
    } else {
      setLinkImage('')
      setLinkVideo('')
      setLinkAudio('')
    }
  }, [])

  return (
    <div className={styles.FooterChat}>
      {sending && <p>Sending...</p>}
      <i style={{ color: chatInfo.color }} className='fas fa-plus-circle'></i>
      <i
        onClick={() => inputFileRef.current?.click()}
        style={{ color: chatInfo.color }}
        className='far fa-photo-video'
      >
        <input
          onChange={(e) => {
            handleChangeFile(e)
            setValueInput('')
          }}
          ref={inputFileRef}
          type='file'
          value={valueInput}
        />
      </i>
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

export default memo(FooterChat)
