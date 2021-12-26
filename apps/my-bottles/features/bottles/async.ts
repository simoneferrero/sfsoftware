import { BottleForm } from '../../types/BottleForm'

import { createAsyncThunk } from '@reduxjs/toolkit'

import { uploadImage } from '../../api/imageUpload'
import { fetchBottles, postBottle, patchBottle } from '../../api/bottles'

import NAMESPACE from './namespace'

export const getBottles = createAsyncThunk(`${NAMESPACE}/getAll`, async () => {
  const data = await fetchBottles()

  return data
})

export const addBottle = createAsyncThunk(
  `${NAMESPACE}/add`,
  async ({
    formValues,
    resetForm,
  }: {
    formValues: BottleForm
    resetForm: () => void
  }) => {
    const { image, ...values } = formValues
    const imageUrl = await uploadImage(image)

    const data = await postBottle({ ...values, imageUrl })

    resetForm()

    return data
  }
)

export const modifyBottle = createAsyncThunk(
  `${NAMESPACE}/modify`,
  async ({
    formValues,
    resetForm,
  }: {
    formValues: BottleForm
    resetForm: () => void
  }) => {
    const { image, ...values } = formValues
    const imageUrl = await uploadImage(image)

    const data = await patchBottle({ ...values, imageUrl })

    resetForm()

    return data
  }
)
