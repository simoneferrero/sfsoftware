import { ObjectId } from 'mongodb'

export interface Bottle {
  _id: Id
  category: Category
  imageUrl?: string
  name: Name
  quantity: Quantity
  rating: Rating
  type?: Type
  user: string
  volume: Volume
  year?: Year
}

export type Id = ObjectId
export type Category = 'WINE' | 'BEER' | 'SPIRIT'
export type Name = string
export type Quantity = number
export type Rating = number
export type Type = string
export type Volume = number
export type Year = number
