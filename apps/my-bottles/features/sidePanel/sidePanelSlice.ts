import { createSlice } from '@reduxjs/toolkit'

export interface SidePanelState {
  visible: boolean
}

const initialState: SidePanelState = {
  visible: false,
}

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload
    },
  },
})

export const { setVisible } = sidePanelSlice.actions

export default sidePanelSlice.reducer
