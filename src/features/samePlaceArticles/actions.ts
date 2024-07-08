import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSamePlaceArticlesAPI } from '@app/API_public';

export const fetchSamePlaceArticles = createAsyncThunk(
  'api/fetchSamePlaceArticles',
  (placeID: number, thunkAPI: GetThunkAPI<any>) =>
    fetchSamePlaceArticlesAPI(placeID, thunkAPI)
);
