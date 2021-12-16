import { configureStore } from '@reduxjs/toolkit';
import sidePanelReducer from '../features/sidePanel/sidePanelSlice';
import bottleContainerReducer from '../features/bottleContainer/bottleContainerSlice';

export const store = configureStore({
  reducer: {
    bottleContainer: bottleContainerReducer,
    sidePanel: sidePanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
