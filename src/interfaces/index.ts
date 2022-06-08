export interface ICreateUserDto {
  phone_or_email: string
  password: string
  repassword: string
  fullname: string
}

export interface ILoginAccountUserDto {
  phone_or_email: string
  password: string
}
