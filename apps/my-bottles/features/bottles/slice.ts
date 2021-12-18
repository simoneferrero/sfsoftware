import { ObjectId } from 'mongoose';
import { Bottle } from '../../types/Bottle';
import type { RootState } from '../../app/store';

import axios from 'axios';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import AWS from 'aws-sdk';

const AWS_ACCESS_KEY_ID = process.env.NX_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.NX_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.NX_AWS_REGION;
const AWS_BUCKET = process.env.NX_AWS_BUCKET;
const AWS_S3_DOMAIN = process.env.NX_AWS_S3_DOMAIN;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const myBottlesBucket = new AWS.S3({
  params: { Bucket: AWS_BUCKET },
  region: AWS_REGION,
});

const getS3PutObjectParams = (image, name) => ({
  ACL: 'public-read',
  Body: image,
  Bucket: AWS_BUCKET,
  Key: name,
});

const uploadImage = async (image) => {
  if (!image) return;

  const imageName = `${Date.now()}_${image.name.replaceAll(' ', '_')}`;
  const uploadedFile = await myBottlesBucket
    .putObject(getS3PutObjectParams(image, imageName))
    .promise();

  if (uploadedFile.$response.httpResponse.statusCode !== 200) {
    throw new Error('Upload failed');
  }

  return AWS_S3_DOMAIN + imageName;
};

export const bottlesAdapter = createEntityAdapter<Bottle>({
  selectId: (bottle) => bottle._id.toString(),
});

const initialState: EntityState<Bottle> & {
  loading: boolean;
  error?: string;
  visibleForm: boolean;
  selectedBottle?: ObjectId;
} = bottlesAdapter.getInitialState({
  loading: false,
  error: undefined,
  visibleForm: false,
  selectedBottle: undefined,
});

export const getBottles = createAsyncThunk('bottles/getAll', async () => {
  const {
    data: { data },
  } = await axios.get('/api/bottles');

  return data;
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
    const { image, ...values } = formValues;
    const imageUrl = await uploadImage(image);

    const {
      data: { data },
    } = await axios.post('/api/bottles', { ...values, imageUrl });

    resetForm();

    return data;
  }
);

export const bottlesSlice = createSlice({
  name: 'bottles',
  initialState,
  reducers: {
    setVisibleForm: (state, action) => {
      state.visibleForm = action.payload;
    },
  },
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
    builder.addCase(addBottle.pending, (state) => {
      state.error = undefined;
      state.loading = true;
    });
    builder.addCase(addBottle.fulfilled, (state, action) => {
      bottlesAdapter.addOne(state, action.payload);
      state.loading = false;
      state.visibleForm = false;
      state.selectedBottle = undefined;
    });
    builder.addCase(addBottle.rejected, (state) => {
      state.error = 'There was an error adding your bottle.';
      state.loading = false;
    });
  },
});

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
export const { setVisibleForm } = bottlesSlice.actions;

export const { selectAll } = bottlesAdapter.getSelectors(
  (state: RootState) => state.bottles
);
export const selectLoading = (state: RootState): boolean =>
  state.bottles.loading;
export const selectError = (state: RootState): string => state.bottles.error;
export const selectVisibleForm = (state: RootState): boolean =>
  state.bottles.visibleForm;
export const selectSelectedBottle = (state: RootState): string =>
  String(state.bottles.selectedBottle);

export default bottlesSlice.reducer;
