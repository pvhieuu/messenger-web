import clsx from 'clsx'
import _ from 'lodash'
import moment from 'moment'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from '../../hooks'
import { IChangeAvatarDto } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { store } from '../../redux/store'
import { sliceContentSidebar } from '../ContentSidebar/slice'
import { searchListUsersThunk } from '../ContentSidebar/thunks'
import { sliceFormLogin } from '../FormLogin/slice'
import { logoutAccountUserThunk } from '../FormLogin/thunks'
import { sliceHeaderChat } from '../HeaderChat/slice'
import styles from './HeaderSidebar.module.scss'
import {
  contentSearchSelector,
  myInfoSelector,
  showSearchUsersSelector,
} from './selectors'
import { sliceHeaderSidebar } from './slice'
import { changeAvatarThunk, getMyInfoThunk } from './thunks'

function HeaderSidebar() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [showOptions, setShowOptions] = useState(false)
  const [showChangeAvatar, setShowChangeAvatar] = useState(false)
  const [newAvatar, setNewAvatar] = useState('')

  const showSearchUsers = useSelector(showSearchUsersSelector)
  const myInfo = useSelector(myInfoSelector)
  const contentSearch = useSelector(contentSearchSelector)

  const debounce = useDebounce(contentSearch, 500)

  useEffect(() => {
    _.trim(debounce)
      ? dispatch(searchListUsersThunk(_.trim(debounce)))
      : dispatch(sliceContentSidebar.actions.setListUsers([]))
  }, [debounce, dispatch])

  window.onclick = useCallback(() => {
    showOptions && setShowOptions(false)
    showChangeAvatar && setShowChangeAvatar(false)
  }, [showChangeAvatar, showOptions])

  useEffect(() => {
    dispatch(getMyInfoThunk())
  }, [dispatch])

  const handleChangeFile = useCallback((e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setNewAvatar(reader.result?.toString() || '')
      }
      reader.onerror = function () {
        setNewAvatar('')
      }
    } else {
      setNewAvatar('')
    }
  }, [])

  const handleChangeAvatar = useCallback(() => {
    const changeAvatarDto: IChangeAvatarDto = {
      new_avatar: _.trim(newAvatar) ? _.trim(newAvatar) : null,
    }
    dispatch(changeAvatarThunk(changeAvatarDto))
    setShowChangeAvatar(false)
  }, [dispatch, newAvatar])

  const handleLogout = useCallback(() => {
    dispatch(logoutAccountUserThunk())
    dispatch(sliceFormLogin.actions.setMessage(''))
    dispatch(sliceHeaderChat.actions.setChatInfo(null))
    dispatch(sliceHeaderSidebar.actions.setShowSearchUsers(false))
    socket.emit('update status online', {
      user_id: myInfo.id,
      data: {
        status_online: false,
        last_logout: moment(),
      },
    })
  }, [dispatch, myInfo.id])

  return (
    <div className={styles.HeaderSidebar}>
      <div className={styles.containerInfo}>
        <div className={styles.left}>
          <img
            onClick={(e) => {
              setShowChangeAvatar(true)
              e.stopPropagation()
            }}
            src={
              myInfo?.avatar
                ? myInfo.avatar
                : require('../../assets/img/avatar.png')
            }
            alt='avatar'
          />
          <span>Chat</span>
          {showChangeAvatar && (
            <div className={styles.changeAvatar}>
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modal}
              >
                <p>Change Avatar</p>
                <label htmlFor='image'>Choose file image</label>
                <input
                  type='file'
                  id='image'
                  onChange={(e) => handleChangeFile(e)}
                />
                <div className={styles.containerBtnSubmit}>
                  <button onClick={() => setShowChangeAvatar(false)}>
                    Back
                  </button>
                  <button onClick={handleChangeAvatar}>Submit</button>
                </div>
              </div>
            </div>
          )}
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
                  <span>Tu??? ch???n</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-bowling-ball'></i>
                  <span>Ng?????i li??n h??? ??ang ho???t ?????ng</span>
                </li>
                <li>
                  <i className='fas fa-comment-dots'></i>
                  <span>Tin nh???n ??ang ch???</span>
                </li>
                <li>
                  <i className='fas fa-archive'></i>
                  <span>??o???n chat ???? l??u tr???</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-question-circle'></i>
                  <span>Tr??? gi??p</span>
                </li>
                <li>
                  <i className='fas fa-exclamation-circle'></i>
                  <span>B??o c??o s??? c???</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fas fa-info-circle'></i>
                  <span>Gi???i thi???u</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>??i???u kho???n</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>Ch??nh s??ch d??? li???u</span>
                </li>
                <li>
                  <i className='far fa-align-left'></i>
                  <span>Ch??nh s??ch v??? cookie</span>
                </li>
                <div className={styles.separate}></div>
                <li>
                  <i className='fab fa-facebook-messenger'></i>
                  <span>M???i! Messenger d??nh cho m??y Mac</span>
                </li>
                <li onClick={handleLogout}>
                  <i className='fas fa-sign-out'></i>
                  <span>????ng xu???t</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className={styles.containerInput}>
        {showSearchUsers && (
          <i
            onClick={() => {
              dispatch(sliceHeaderSidebar.actions.setShowSearchUsers(false))
              dispatch(sliceHeaderSidebar.actions.setContentSearch(''))
            }}
            className={clsx('far fa-arrow-left', styles.arrow)}
          ></i>
        )}
        {!showSearchUsers && (
          <i className={clsx('far fa-search', styles.search)}></i>
        )}
        <input
          onFocus={() =>
            dispatch(sliceHeaderSidebar.actions.setShowSearchUsers(true))
          }
          className={showSearchUsers ? styles.padding : ''}
          type='text'
          placeholder='Search on Messenger'
          value={contentSearch}
          onChange={(e) =>
            dispatch(
              sliceHeaderSidebar.actions.setContentSearch(e.target.value)
            )
          }
        />
      </div>
    </div>
  )
}

export default memo(HeaderSidebar)
