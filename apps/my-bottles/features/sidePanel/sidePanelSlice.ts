import { createSlice } from '@reduxjs/toolkit';

export interface SidePanelState {
  visible: boolean;
}

const initialState: SidePanelState = {
  visible: false,
};

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState,
  reducers: {
    toggle: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { toggle } = sidePanelSlice.actions;

export default sidePanelSlice.reducer;
