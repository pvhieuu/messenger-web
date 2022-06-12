export interface ICreateUserDto {
  phone_or_email: string
  password: string
  repassword: string
  fullname: string
}

export interface ICreateChatDto {
  guest_id: string
}

export interface IDeleteChatDto {
  chat_id: string
  guest_chat_id: string | null
  guest_id: string
}

export interface ILoginAccountUserDto {
  phone_or_email: string
  password: string
}

export interface IChangeAvatarDto {
  new_avatar: string | null
}

export interface IUser {
  id: string
  fullname: string
  fresh_name: string
  avatar: string | null
  status_online: boolean
  last_logout: Date | null
}

export interface IChat {
  id: string
  host: IUser
  guest: IUser
  guest_chat_id: string | null
  last_message:
    | [
        {
          id: string
          content: string
          type: TYPE_MESSAGE
          sender_id: string
          created_at: Date
        }
      ]
    | []
  readed: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export enum TYPE_MESSAGE {
  TEXT = 'text',
  ICON = 'icon',
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
}

export interface IMessage {
  id: string
  content: string
  type: TYPE_MESSAGE
  sender_id: string
  receiver_id: string
  chat_id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export interface ICreateMessageDto {
  content: string
  type: TYPE_MESSAGE
  chat_id: string
  guest_id: string
  guest_chat_id: string
}

export interface IUpdateReadedDto {
  chat_id: string
}
