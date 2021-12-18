import mongoose from 'mongoose'

import { Bottle } from '../../types/Bottle'

const BottleSchema = new mongoose.Schema<Bottle>({
  category: { type: String, required: true },
  imageUrl: String,
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  type: String,
  user: { type: String, required: true },
  volume: { type: String, required: true },
  year: { type: Number, max: new Date().getFullYear() },
})

export default mongoose.models.Bottle || mongoose.model('Bottle', BottleSchema)
