import { ObjectId } from 'mongoose'
import { Bottle } from '../../types/Bottle'

import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

import { getBottles, addBottle, modifyBottle } from './async'
import NAMESPACE from './namespace'

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id.toString(),
})

const initialState: EntityState<Bottle> & {
  loading: boolean
  error?: string
  visibleForm: boolean
  selectedBottle?: ObjectId
} = bottlesAdapter.getInitialState({
  loading: true,
  error: undefined,
  visibleForm: false,
  selectedBottle: undefined,
})

export const bottlesSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setVisibleForm: (state, action) => {
      state.visibleForm = action.payload
    },
    setSelectedBottle: (state, action) => {
      state.selectedBottle = action.payload
      state.visibleForm = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBottles.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(getBottles.fulfilled, (state, action) => {
      bottlesAdapter.upsertMany(state, action.payload)
      state.loading = false
    })
    builder.addCase(getBottles.rejected, (state) => {
      state.error = 'There was an error loading your bottles.'
      state.loading = false
    })
    builder.addCase(addBottle.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(addBottle.fulfilled, (state, action) => {
      bottlesAdapter.addOne(state, action.payload)
      state.loading = false
      state.visibleForm = false
      state.selectedBottle = undefined
    })
    builder.addCase(addBottle.rejected, (state) => {
      state.error = 'There was an error adding your bottle.'
      state.loading = false
    })
    builder.addCase(modifyBottle.pending, (state) => {
      state.error = undefined
      state.loading = true
    })
    builder.addCase(modifyBottle.fulfilled, (state, action) => {
      bottlesAdapter.upsertOne(state, action.payload)
      state.loading = false
      state.visibleForm = false
      state.selectedBottle = undefined
    })
    builder.addCase(modifyBottle.rejected, (state) => {
      state.error = 'There was an error updating your bottle.'
      state.loading = false
    })
  },
})

export const { setVisibleForm, setSelectedBottle } = bottlesSlice.actions

export default bottlesSlice.reducer
