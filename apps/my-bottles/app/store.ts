import { configureStore } from '@reduxjs/toolkit';
import bottleContainerReducer from '../features/bottleContainer/bottleContainerSlice';
import bottleFormReducer from '../features/bottleForm/bottleFormSlice';
import sidePanelReducer from '../features/sidePanel/sidePanelSlice';

export const store = configureStore({
  reducer: {
    bottleContainer: bottleContainerReducer,
    bottleForm: bottleFormReducer,
    sidePanel: sidePanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
