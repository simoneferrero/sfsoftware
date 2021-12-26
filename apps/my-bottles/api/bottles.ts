import { BottleForm } from '../types/BottleForm'
import { Bottle } from '../types/Bottle'

import axios from 'axios'

const BOTTLES_ROUTE = '/api/bottles'

interface AugmentedBottleForm extends BottleForm {
  imageUrl: string
}

export const fetchBottles = async (): Promise<Bottle[]> => {
  const {
    data: { data },
  } = await axios.get(BOTTLES_ROUTE)

  return data
}

export const postBottle = async (
  bottle: AugmentedBottleForm
): Promise<Bottle> => {
  const {
    data: { data },
  } = await axios.post(BOTTLES_ROUTE, bottle)

  return data
}

export const patchBottle = async (
  bottle: AugmentedBottleForm
): Promise<Bottle> => {
  const {
    data: { data },
  } = await axios.patch(`${BOTTLES_ROUTE}/${bottle._id}`, bottle)

  return data
}
