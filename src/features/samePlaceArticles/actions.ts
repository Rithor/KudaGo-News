import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSamePlaceArticlesAPI } from '@app/API_public';

export const fetchSamePlaceArticles = createAsyncThunk(
  'api/fetchSamePlaceArticles',
  (
    { placeID, isMobile }: { placeID: number; isMobile: boolean },
    thunkAPI: GetThunkAPI<any>
  ) => fetchSamePlaceArticlesAPI(placeID, isMobile, thunkAPI)
);
