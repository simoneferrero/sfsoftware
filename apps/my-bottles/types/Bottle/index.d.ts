import { ObjectId } from 'mongodb';

export interface Bottle {
  _id?: ObjectId;
  category: 'WINE' | 'BEER' | 'SPIRIT';
  imageUrl?: string;
  name: string;
  quantity: number;
  rating: number;
  type?: string;
  user?: string;
  volume: number;
  year?: number;
}

export interface BottleType {
  text: string;
  value: string;
}

export interface BottleCategory {
  text: 'Wine' | 'Beer' | 'Spirit';
  value: 'WINE' | 'BEER' | 'SPIRIT';
  showYear?: boolean;
  types?: BottleType[];
}
