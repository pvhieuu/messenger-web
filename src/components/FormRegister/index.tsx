import styles from './FormRegister.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ICreateUserDto } from '../../interfaces'
import { isKeySpace } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { registerNewUserThunk } from './thunks'
import { store } from '../../redux/store'
import { messageSelector, successSelector } from './selectors'
import { sliceFormRegister } from './slice'

function FormRegister() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRepassword, setHideRepassword] = useState(true)
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [fullname, setFullname] = useState('')

  const success = useSelector(successSelector)
  const message = useSelector(messageSelector)

  const handleRegister = () => {
    const createUserDto: ICreateUserDto = {
      phone_or_email: phoneOrEmail.trim(),
      password: password.trim(),
      repassword: repassword.trim(),
      fullname: fullname.trim(),
    }
    dispatch(registerNewUserThunk(createUserDto))
  }

  window.onkeydown = (e) => {
    if (
      e.key === 'Enter' &&
      phoneOrEmail.trim() &&
      password.trim() &&
      repassword.trim() &&
      fullname.trim()
    ) {
      handleRegister()
    }
  }

  return (
    <div className={styles.FormRegister}>
      <input
        type='text'
        placeholder='Email or phone number'
        value={phoneOrEmail}
        onChange={(e) => {
          if (!isKeySpace(e.target.value)) {
            setPhoneOrEmail(e.target.value)
            dispatch(sliceFormRegister.actions.setMessage(''))
          }
        }}
      />
      <div className={styles.containerInput}>
        <input
          type={hidePassword ? 'password' : 'text'}
          placeholder='Password'
          value={password}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              setPassword(e.target.value)
              dispatch(sliceFormRegister.actions.setMessage(''))
            }
          }}
        />
        <i
          onClick={() => setHidePassword(!hidePassword)}
          className={hidePassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
        ></i>
      </div>
      <div className={styles.containerInput}>
        <input
          type={hideRepassword ? 'password' : 'text'}
          placeholder='Re-password'
          value={repassword}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              setRepassword(e.target.value)
              dispatch(sliceFormRegister.actions.setMessage(''))
            }
          }}
        />
        <i
          onClick={() => setHideRepassword(!hideRepassword)}
          className={hideRepassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
        ></i>
      </div>
      <input
        type='text'
        placeholder='Fullname'
        value={fullname}
        onChange={(e) => {
          if (!isKeySpace(e.target.value)) {
            setFullname(e.target.value)
            dispatch(sliceFormRegister.actions.setMessage(''))
          }
        }}
      />
      <div
        style={{ color: success ? '#28a745' : '#dc3545' }}
        className={styles.announce}
      >
        {message && (
          <i
            className={
              success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
            }
          ></i>
        )}
        <span>{message}</span>
      </div>
      <div className={styles.containerBtnSubmit}>
        <button onClick={handleRegister}>Register</button>
        <Link
          onClick={() => dispatch(sliceFormRegister.actions.setMessage(''))}
          to='/login'
        >
          Already have an account?
        </Link>
      </div>
    </div>
  )
}

export default FormRegister
