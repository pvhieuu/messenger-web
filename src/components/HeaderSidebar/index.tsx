import clsx from 'clsx'
import { useState } from 'react'
import styles from './HeaderSidebar.module.scss'

function HeaderSidebar() {
  const [showOptions, setShowOptions] = useState(false)
  const showSearchUsers = false

  window.onclick = () => {
    showOptions && setShowOptions(!showOptions)
  }

  return (
    <div className={styles.HeaderSidebar}>
      <div className={styles.containerInfo}>
        <div className={styles.left}>
          <img src={require('../../assets/img/avatar.png')} alt='avatar' />
          <span>Chat</span>
        </div>
        <ul className={styles.right}>
          <li>
            <i className='fas fa-video-plus'></i>
          </li>
          <li>
            <i className='far fa-edit'></i>
          </li>
          <li>
            <i
              onClick={(e) => {
                setShowOptions(!showOptions)
                e.stopPropagation()
              }}
              className='fas fa-ellipsis-v'
            ></i>
            {showOptions && (
              <ul>
                <li>
                  <i className='fas fa-cog'></i>
                  <span>Tuỳ chọn</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-bowling-ball'></i>
                  <span>Người liên hệ đang hoạt động</span>
                </li>
                <li>
                  <i className='fas fa-comment-dots'></i>
                  <span>Tin nhắn đang chờ</span>
                </li>
                <li>
                  <i className='fas fa-archive'></i>
                  <span>Đoạn chat đã lưu trữ</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-question-circle'></i>
                  <span>Trợ giúp</span>
                </li>
                <li>
                  <i className='fas fa-exclamation-circle'></i>
                  <span>Báo cáo sự cố</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-info-circle'></i>
                  <span>Giới thiệu</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>Điều khoản</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>Chính sách dữ liệu</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>Chính sách về cookie</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fab fa-facebook-messenger'></i>
                  <span>Mới! Messenger dành cho máy Mac</span>
                </li>
                <li>
                  <i className='fas fa-sign-out'></i>
                  <span>Đăng xuất</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className={styles.containerInput}>
        {showSearchUsers && (
          <i className={clsx('far fa-arrow-left', styles.arrow)}></i>
        )}
        {!showSearchUsers && (
          <i className={clsx('far fa-search', styles.search)}></i>
        )}
        <input
          className={showSearchUsers ? styles.padding : ''}
          type='text'
          placeholder='Search on Messenger'
        />
      </div>
    </div>
  )
}

export default HeaderSidebar
