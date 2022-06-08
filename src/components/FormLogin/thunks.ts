import { createAsyncThunk } from '@reduxjs/toolkit'
import { contentType, url } from '../../api'
import { ILoginAccountUserDto } from '../../interfaces'

export const loginAccountUserThunk = createAsyncThunk(
  'FormLogin',
  async (loginAccountUserDto: ILoginAccountUserDto) => {
    const res = await fetch(`${url}/user/login`, {
      method: 'POST',
      headers: contentType(),
      body: JSON.stringify(loginAccountUserDto),
    })
    const data = await res.json()
    if (data.success) {
      localStorage.setItem('access_token', data.data.access_token)
    }
    return data
  }
)
