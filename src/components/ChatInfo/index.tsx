import clsx from 'clsx'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './ChatInfo.module.scss'

function ChatInfo() {
  const [showOptions1, setShowOptions1] = useState(false)
  const [showOptions2, setShowOptions2] = useState(false)
  const [showOptions3, setShowOptions3] = useState(false)

  const chatInfo = useSelector(chatInfoSelector)
  const { guest } = chatInfo

  return (
    <div className={styles.ChatInfo}>
      <img
        src={
          guest.avatar ? guest.avatar : require('../../assets/img/avatar.png')
        }
        alt='avatar'
      />
      <p>{guest.fullname}</p>
      <div
        onClick={() => setShowOptions1(!showOptions1)}
        className={styles.label}
      >
        <span>Tuỳ chỉnh đoạn chat</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions1 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions1 && (
        <ul>
          <li>
            <i className='fas fa-dot-circle'></i>
            <span>Đổi chủ đề</span>
          </li>
          <li>
            <i className='fas fa-thumbs-up'></i>
            <span>Thay đổi biểu tượng cảm xúc</span>
          </li>
          <li>
            <i className='far fa-text-size'></i>
            <span>Chỉnh sửa biệt danh</span>
          </li>
          <li>
            <i className='far fa-search'></i>
            <span>Tìm kiếm trong cuộc trò chuyện</span>
          </li>
        </ul>
      )}
      <div
        onClick={() => setShowOptions2(!showOptions2)}
        className={styles.label}
      >
        <span>File phương tiện, file và liên kết</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions2 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions2 && (
        <ul>
          <li>
            <i className='far fa-photo-video'></i>
            <span>File phương tiện</span>
          </li>
          <li>
            <i className='fas fa-file-alt'></i>
            <span>File</span>
          </li>
          <li>
            <i className='far fa-link'></i>
            <span>Liên kết</span>
          </li>
        </ul>
      )}
      <div
        onClick={() => setShowOptions3(!showOptions3)}
        className={styles.label}
      >
        <span>Tuỳ chỉnh đoạn chat</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions3 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions3 && (
        <ul>
          <li>
            <i className='fas fa-bell'></i>
            <span>Tắt thông báo</span>
          </li>
          <li>
            <i className='fas fa-minus-circle'></i>
            <span>Chặn</span>
          </li>
          <li>
            <i className='fas fa-exclamation-circle'></i>
            <span>Báo cáo</span>
          </li>
        </ul>
      )}
    </div>
  )
}

export default ChatInfo
