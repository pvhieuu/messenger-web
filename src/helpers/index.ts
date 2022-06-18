import {
  BACKGROUND_COLOR,
  IChat,
  ICreateMessageDto,
  MAIN_COLOR,
  MAIN_EMOJI,
  TYPE_MESSAGE,
} from '../interfaces'

export const isKeySpace = (value: string) => value === ' '

export const createDtoSendMessage = (
  content: string,
  type: TYPE_MESSAGE,
  chatInfo: IChat
): ICreateMessageDto => ({
  content: content.trim(),
  type,
  chat_id: chatInfo.id,
  guest_chat_id: chatInfo.guest_chat_id,
  guest_id: chatInfo.guest.id,
  nickname_host: chatInfo.nickname_host,
  nickname_guest: chatInfo.nickname_guest,
  color: chatInfo.color as MAIN_COLOR,
  emoji: chatInfo.emoji as MAIN_EMOJI,
  background_color: chatInfo.background_color as BACKGROUND_COLOR,
})

export const formatContentMessage = (content: string) => {
  if (content.startsWith('fa')) {
    content = TYPE_MESSAGE.ICON
  }
  if (content.startsWith('data:image')) {
    content = TYPE_MESSAGE.IMAGE
  }
  if (content.startsWith('data:video')) {
    content = TYPE_MESSAGE.VIDEO
  }
  if (content.startsWith('data:audio')) {
    content = TYPE_MESSAGE.VOICE
  }
  return content
}
