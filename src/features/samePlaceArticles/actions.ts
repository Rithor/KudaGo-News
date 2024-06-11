import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSamePlaceArticlesAPI } from '@app/API';

export const fetchSamePlaceArticles = createAsyncThunk(
  'api/fetchSamePlaceArticles',
  (placeID: string, thunkAPI: GetThunkAPI<any>) =>
    fetchSamePlaceArticlesAPI(placeID, thunkAPI)
);
