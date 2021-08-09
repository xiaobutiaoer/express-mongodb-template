import { Document } from 'mongoose'
export interface IUser extends Document {
  password: string
  username: string
  tel?: string
  role?: string
}
