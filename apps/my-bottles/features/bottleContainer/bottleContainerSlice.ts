import { Bottle } from '../../types/Bottle';
import type { RootState } from '../../app/store';

import axios from 'axios';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  //   PayloadAction,
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

// export const addBottle = createAsyncThunk(
// 	'bottles/add',
// 	async ({ formValues }: { formValues: BottleFormState }) => {
// 	  const imageUrl = await uploadImage(formValues?.images?.[0])

// 	  const parsedFormValues = parseFormValues(formValues, imageUrl)
// 	  const { data } = await axios.post('/api/bottles', parsedFormValues)

// 	  return data
// 	}
//   )

//   export const updateBottle = createAsyncThunk(
// 	'bottles/update',
// 	async ({ formValues }: { formValues: BottleFormState }) => {
// 	  const imageUrl = await uploadImage(formValues?.images?.[0])

// 	  const parsedFormValues = parseFormValues(formValues, imageUrl)
// 	  const { data } = await axios.put(
// 		`/api/bottles/${formValues._id}`,
// 		parsedFormValues
// 	  )

// 	  return data
// 	}
//   )

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
    //   builder.addCase(addBottle.pending, (state) => {
    // 	state.error = undefined
    // 	state.loading = true
    //   })
    //   builder.addCase(addBottle.fulfilled, (state, action) => {
    // 	bottlesAdapter.addOne(state, action.payload)
    // 	state.loading = false
    // 	state.bottleFormStatus = 'closed'
    // 	state.bottleId = undefined
    //   })
    //   builder.addCase(addBottle.rejected, (state) => {
    // 	state.error = 'There was an error adding your bottle.'
    // 	state.loading = false
    //   })
    //   builder.addCase(updateBottle.pending, (state) => {
    // 	state.error = undefined
    // 	state.loading = true
    //   })
    //   builder.addCase(updateBottle.fulfilled, (state, action) => {
    // 	bottlesAdapter.upsertOne(state, action.payload)
    // 	state.loading = false
    // 	state.bottleFormStatus = 'closed'
    // 	state.bottleId = undefined
    //   })
    //   builder.addCase(updateBottle.rejected, (state) => {
    // 	state.error = 'There was an error updating your bottle.'
    // 	state.loading = false
    //   })
  },
});

export const { selectAll } = bottlesAdapter.getSelectors(
  (state: RootState) => state.bottleContainer
);

// export const {
//   selectById: selectBottleById,
//   selectIds: selectBottleIds,
//   selectEntities: selectBottleEntities,
//   selectAll: selectAllBottles,
//   selectTotal: selectTotalBottles,
// } = bottlesAdapter.getSelectors((state: RootState) => state.bottleContainer);
export const selectLoading = (state: RootState): boolean =>
  state.bottleContainer.loading;
export const selectError = (state: RootState): string =>
  state.bottleContainer.error;

export default bottleContainerSlice.reducer;
