import { createAsyncThunk } from '@reduxjs/toolkit'
import { allConfigs, authorization, url } from '../../api'
import { ICreateMessageDto } from '../../interfaces'

export const getListMessagesThunk = createAsyncThunk(
  'ContentChat/getListMessages',
  async (chat_id: string) => {
    const res = await fetch(`${url}/message/get/${chat_id}`, {
      method: 'GET',
      headers: authorization(),
    })
    const data = await res.json()
    return data
  }
)

export const sendMessageThunk = createAsyncThunk(
  'ContentChat/sendMessage',
  async (createMessageDto: ICreateMessageDto) => {
    const res = await fetch(`${url}/message/send`, {
      method: 'POST',
      headers: allConfigs(),
      body: JSON.stringify(createMessageDto),
    })
    const data = await res.json()
    return data
  }
)
