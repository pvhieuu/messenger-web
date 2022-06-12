import { createSlice } from '@reduxjs/toolkit'
import { IChat, IUser } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import {
  createNewChatThunk,
  deleteChatThunk,
  getListChatsThunk,
  searchListUsersThunk,
  updateReadedThunk,
} from './thunks'

const initialState: {
  listChats: IChat[]
  listUsers: IUser[]
} = {
  listChats: [],
  listUsers: [],
}

export const sliceContentSidebar = createSlice({
  name: 'ContentSidebar',
  initialState,
  reducers: {
    setListUsers: (state, action) => {
      state.listUsers = action.payload
    },
    updateLastMessage: (state, action) => {
      state.listChats = state.listChats.map((chat: IChat) =>
        chat.id === action.payload.chat_id
          ? { ...chat, last_message: [action.payload] }
          : chat
      )
    },
    updateReaded: (state, action) => {
      state.listChats = state.listChats.map((chat: IChat) =>
        chat.id === action.payload.chat_id
          ? { ...chat, readed: action.payload.readed }
          : chat
      )
    },
    updateGuestChatId: (state, action) => {
      state.listChats = state.listChats.map((chat: IChat) =>
        chat.id === action.payload.chat_id
          ? { ...chat, guest_chat_id: action.payload.guest_chat_id }
          : chat
      )
    },
    listenChat: (state, action) => {
      state.listChats = [action.payload, ...state.listChats]
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getListChatsThunk.fulfilled, (state, action) => {
        state.listChats = action.payload.data.list_chats
      })
      .addCase(searchListUsersThunk.fulfilled, (state, action) => {
        state.listUsers = action.payload.data.list_users
      })
      .addCase(createNewChatThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listChats = [action.payload.data.new_chat, ...state.listChats]
          if (action.payload.data.new_chat.guest_chat_id) {
            socket.emit('create chat owner', action.payload.data.new_chat)
          }
        }
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listChats = state.listChats.filter(
            (chat: IChat) => chat.id !== action.payload.data.chat_id
          )
          socket.emit('delete chat', {
            chat_id: action.payload.data.guest_chat_id,
            guest_id: action.payload.data.guest_id,
          })
        }
      })
      .addCase(updateReadedThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.listChats = state.listChats.map((chat: IChat) =>
            chat.id === action.payload.data.chat_id
              ? { ...chat, readed: true }
              : chat
          )
        }
      }),
})
