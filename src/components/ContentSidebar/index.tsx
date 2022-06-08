import clsx from 'clsx'
import { useState } from 'react'
import styles from './ContentSidebar.module.scss'

function ContentSidebar() {
  const [showOptions, setShowOptions] = useState(false)
  const showSearchUsers = false

  return !showSearchUsers ? (
    <ul className={styles.ContentSidebar}>
      <li>
        <img src={require('../../assets/img/avatar.png')} alt='avatar' />
        <div className={styles.containerInfo}>
          <p>Nguyễn Văn Vinh</p>
          <div className={styles.lastMessage}>
            <span>
              ahs jasdj ashduf asdjf ashdfj ahsdf asdgfa asdgfh asdhf asdyfg
              asdgf asdkfb sadkf
            </span>
            <span>- 3 hour</span>
          </div>
        </div>
        <i
          onClick={() => setShowOptions(!showOptions)}
          className={clsx(
            'far fa-angle-down',
            showOptions ? styles.rotate : ''
          )}
        ></i>
      </li>
      {showOptions && (
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
          <li>
            <i className='fas fa-trash'></i>
            <span>Xoá đoạn chat</span>
          </li>
          <li>
            <i className='fas fa-exclamation-circle'></i>
            <span>Báo cáo</span>
          </li>
        </ul>
      )}
    </ul>
  ) : (
    <ul className={styles.ContentSearch}>
      <li>
        <img src={require('../../assets/img/avatar.png')} alt='avatar' />
        <span>Nguyễn Văn Vinh</span>
      </li>
    </ul>
  )
}

export default ContentSidebar
