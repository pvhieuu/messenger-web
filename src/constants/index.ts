import {
  BACKGROUND_COLOR,
  MAIN_COLOR,
  MAIN_EMOJI,
  MESSAGE_EMOJI,
} from '../interfaces'

export const MAIN_COLORS: MAIN_COLOR[] = [
  MAIN_COLOR.PRIMARY,
  MAIN_COLOR.SECONDARY,
  MAIN_COLOR.SUCCESS,
  MAIN_COLOR.DANGER,
  MAIN_COLOR.WARNING,
  MAIN_COLOR.INFO,
  MAIN_COLOR.VIOLET,
  MAIN_COLOR.DARK,
]

export const BACKGROUND_COLORS: BACKGROUND_COLOR[] = [
  BACKGROUND_COLOR.white,
  BACKGROUND_COLOR.blue,
  BACKGROUND_COLOR.green,
  BACKGROUND_COLOR.orange,
  BACKGROUND_COLOR.red,
  BACKGROUND_COLOR.violet,
]

export const EMOJI: string[] = [
  '๐',
  '๐',
  '๐',
  '๐คฃ',
  '๐ฅฒ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฅฐ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐คช',
  '๐คจ',
  '๐ง',
  '๐ค',
  '๐',
  '๐คฉ',
  '๐ฅณ',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐',
  '๐ฃ',
  '๐',
  '๐ซ',
  '๐ฉ',
  '๐ฅบ',
  '๐ข',
  '๐ญ',
  '๐ค',
  '๐ ',
  '๐ก',
  '๐คฌ',
  '๐คฏ',
  '๐ณ',
  '๐ฅต',
  '๐ฅถ',
  '๐ฑ',
  '๐จ',
  '๐ฐ',
  '๐ฅ',
  '๐',
  '๐ค',
  '๐ค',
  '๐คญ',
  '๐คซ',
  '๐คฅ',
  '๐ถ',
  '๐',
  '๐',
  '๐ฌ',
  '๐',
  '๐ฏ',
  '๐ฆ',
  '๐ง',
  '๐ฎ',
  '๐ฒ',
  '๐ฅฑ',
  '๐ด',
  '๐คค',
  '๐ช',
  '๐ต',
  '๐ค',
  '๐ฅด',
  '๐คข',
  '๐คฎ',
  '๐คง',
]

export const MAIN_EMOJIS: string[] = [
  MAIN_EMOJI.LIKE,
  MAIN_EMOJI.LOVE,
  MAIN_EMOJI.SMILE,
  MAIN_EMOJI.POO,
  MAIN_EMOJI.BALL,
  MAIN_EMOJI.GHOST,
  MAIN_EMOJI.BAN,
]

export const ROUTERS = {
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  all: '*',
}

export const MESSAGE_EMOJIS: string[] = [
  MESSAGE_EMOJI.LOVE,
  MESSAGE_EMOJI.LAUGH,
  MESSAGE_EMOJI.SAD,
  MESSAGE_EMOJI.ANGRY,
  MESSAGE_EMOJI.WOW,
]

export interface IBtnRedirect {
  href: string
  img: string
}

export const REDIRECTS: IBtnRedirect[] = [
  {
    href: 'https://apps.apple.com/us/app/messenger/id1480068668?mt=12',
    img: require('../assets/img/appstore.png'),
  },
  {
    href: 'https://apps.microsoft.com/store/detail/9WZDNCRF0083?hl=en-us&gl=US',
    img: require('../assets/img/microsoft.png'),
  },
]
