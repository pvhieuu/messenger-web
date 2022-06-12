import { createSlice } from '@reduxjs/toolkit'
import { IChat } from '../../interfaces'

const initialState: { showChatInfo: boolean; chatInfo: IChat | null } = {
  showChatInfo: true,
  chatInfo: null,
}

export const sliceHeaderChat = createSlice({
  name: 'HeaderChat',
  initialState,
  reducers: {
    setShowChatInfo: (state, action) => {
      state.showChatInfo = action.payload
    },
    setChatInfo: (state, action) => {
      state.chatInfo = action.payload
    },
    updateGuestChatId: (state, action) => {
      state.chatInfo = state.chatInfo && {
        ...state.chatInfo,
        guest_chat_id: action.payload,
      }
    },
  },
})
