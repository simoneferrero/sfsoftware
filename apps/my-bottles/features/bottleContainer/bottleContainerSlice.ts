import { Bottle } from '../../types/Bottle';
import type { RootState } from '../../app/store';

import axios from 'axios';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id.toString(),
});

const initialState: EntityState<Bottle> & {
  loading: boolean;
  error?: string;
} = bottlesAdapter.getInitialState({
  loading: false,
  error: undefined,
});

export const getBottles = createAsyncThunk('bottles/getAll', async () => {
  const {
    data: { data },
  } = await axios.get('/api/bottles');
  return data;
});

export const bottleContainerSlice = createSlice({
  name: 'bottleContainer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBottles.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(getBottles.fulfilled, (state, action) => {
      bottlesAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
    builder.addCase(getBottles.rejected, (state) => {
      state.error = 'There was an error loading your bottles.';
      state.loading = false;
    });
  },
});

export const { selectAll } = bottlesAdapter.getSelectors(
  (state: RootState) => state.bottleContainer
);

export const selectLoading = (state: RootState): boolean =>
  state.bottleContainer.loading;
export const selectError = (state: RootState): string =>
  state.bottleContainer.error;

export default bottleContainerSlice.reducer;
