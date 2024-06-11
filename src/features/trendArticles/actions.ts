import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrendArticlesAPI } from '@app/API';

export const fetchTrendArticles = createAsyncThunk(
  'api/fetchTrendArticles',
  (_, thunkAPI: GetThunkAPI<any>) => fetchTrendArticlesAPI(thunkAPI)
);
