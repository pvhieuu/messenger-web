import { memo, ReactNode } from 'react'
import styles from './ContentAuth.module.scss'

function ContentAuth({ children }: { children: ReactNode }) {
  return (
    <div className={styles.ContentAuth}>
      <div className={styles.containerAuth}>
        <div className={styles.left}>
          <h1>Hang out anytime, anywhere</h1>
          <p>
            Messenger makes it easy and fun to stay close to your favourite
            people.
          </p>
          {children}
        </div>
        <div className={styles.right}>
          <img
            src={require('../../assets/img/backgroundAuth.png')}
            alt='background'
          />
          <div className={styles.containerBtnDownload}>
            <a
              href='https://apps.apple.com/us/app/messenger/id1480068668?mt=12'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={require('../../assets/img/appstore.png')}
                alt='appstore'
              />
            </a>
            <a
              href='https://apps.microsoft.com/store/detail/9WZDNCRF0083?hl=en-us&gl=US'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={require('../../assets/img/microsoft.png')}
                alt='microsoft'
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ContentAuth)
