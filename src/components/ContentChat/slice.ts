import { createSlice } from '@reduxjs/toolkit'
import { IChat, IMessage } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { getListMessagesThunk, sendMessageThunk } from './thunks'

const initialState: {
  listMessages: IMessage[]
  lastMessage: IMessage | null
  newGuestChat: IChat | null
  sending: boolean
} = {
  listMessages: [],
  lastMessage: null,
  newGuestChat: null,
  sending: false,
}

export const sliceContentChat = createSlice({
  name: 'ContentChat',
  initialState,
  reducers: {
    listenMessage: (state, action) => {
      state.listMessages = [...state.listMessages, action.payload]
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getListMessagesThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listMessages = action.payload.data.list_messages
        }
      })
      .addCase(sendMessageThunk.pending, (state) => {
        state.sending = true
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listMessages = [
            ...state.listMessages,
            action.payload.data.new_message,
          ]
          state.lastMessage = action.payload.data.new_message
          state.sending = false
          socket.emit('send message', action.payload.data.new_guest_message)
          if (action.payload.data.new_guest_chat) {
            state.newGuestChat = action.payload.data.new_guest_chat
            socket.emit('create chat', action.payload.data.new_guest_chat)
          }
        }
      }),
})
