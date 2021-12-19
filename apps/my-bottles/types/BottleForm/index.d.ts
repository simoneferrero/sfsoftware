import {
  Id,
  Category,
  Name,
  Quantity,
  Rating,
  Type,
  Volume,
  Year,
} from '../Bottle'

export interface BottleForm {
  _id?: Id
  category: Category
  image?: File
  name: Name
  quantity: Quantity
  rating: Rating
  type?: Type
  volume: Volume
  year?: Year
}

export interface BottleType {
  text: string
  value: string
}

export interface BottleCategory {
  text: 'Wine' | 'Beer' | 'Spirit'
  value: Category
  showYear?: boolean
  types?: BottleType[]
}
