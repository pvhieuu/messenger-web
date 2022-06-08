import { configureStore } from '@reduxjs/toolkit'
import { sliceFormLogin } from '../components/FormLogin/slice'
import { sliceFormRegister } from '../components/FormRegister/slice'

export const store = configureStore({
  reducer: {
    FormRegister: sliceFormRegister.reducer,
    FormLogin: sliceFormLogin.reducer,
  },
})
