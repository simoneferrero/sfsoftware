import { ObjectId } from 'mongodb';

export interface Bottle {
  _id?: ObjectId;
  category: 'WINE' | 'BEER' | 'SPIRIT';
  imageUrl?: string;
  name: string;
  quantity: number;
  rating: number;
  type?: string;
  user: string;
  volume: string;
  year?: number;
}

export interface BottleType {
  label: string;
  value: string;
}

export interface BottleCategory {
  label: 'Wine' | 'Beer' | 'Spirit';
  value: 'WINE' | 'BEER' | 'SPIRIT';
  showYear?: boolean;
  types?: BottleType[];
}
