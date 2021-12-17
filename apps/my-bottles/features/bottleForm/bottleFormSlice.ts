import { ObjectId } from 'mongodb';
import { Bottle } from '../../types/Bottle';
import type { RootState } from '../../app/store';
import { bottlesAdapter } from '../bottleContainer/bottleContainerSlice';

import axios from 'axios';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  //   PayloadAction,
  EntityState,
} from '@reduxjs/toolkit';

export const bottleForm = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id.toString(),
});

const initialState: EntityState<Bottle> & {
  loading: boolean;
  error?: string;
  visible: boolean;
  selectedBottle?: ObjectId;
} = bottleForm.getInitialState({
  loading: false,
  error: undefined,
  visible: false,
  selectedBottle: undefined,
});

export const addBottle = createAsyncThunk(
  'bottles/add',
  async ({
    formValues,
    resetForm,
  }: {
    formValues: Bottle;
    resetForm: () => void;
  }) => {
    //   const imageUrl = await uploadImage(formValues?.images?.[0])

    //   const parsedFormValues = parseFormValues(formValues, imageUrl)
    const {
      data: { data },
    } = await axios.post('/api/bottles', formValues);

    resetForm();

    console.log('addBottle', data);

    return data;

    // resetForm();

    // return { ...formValues, _id: '61bcc63e8528282f99a3d07f' };
  }
);

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

export const bottleFormSlice = createSlice({
  name: 'bottleForm',
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBottle.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(addBottle.fulfilled, (state, action) => {
      console.log('payload', action.payload);
      bottlesAdapter.addOne(state, action.payload);
      state.loading = false;
      state.visible = false;
      state.selectedBottle = undefined;
    });
    builder.addCase(addBottle.rejected, (state) => {
      state.error = 'There was an error adding your bottle.';
      state.loading = false;
    });
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

// export const { selectAll } = bottlesAdapter.getSelectors(
//   (state: RootState) => state.bottleForm
// );

// export const {
//   selectById: selectBottleById,
//   selectIds: selectBottleIds,
//   selectEntities: selectBottleEntities,
//   selectAll: selectAllBottles,
//   selectTotal: selectTotalBottles,
// } = bottlesAdapter.getSelectors((state: RootState) => state.bottleForm);
// export const selectLoading = (state: RootState): boolean =>
//   state.bottleForm.loading;
// export const selectError = (state: RootState): string => state.bottleForm.error;
export const { setVisible } = bottleFormSlice.actions;

export default bottleFormSlice.reducer;
