import { configureStore } from '@reduxjs/toolkit';
import bottlesReducer from '../features/bottles/slice';
import sidePanelReducer from '../features/sidePanel/sidePanelSlice';

export const store = configureStore({
  reducer: {
    bottles: bottlesReducer,
    sidePanel: sidePanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
