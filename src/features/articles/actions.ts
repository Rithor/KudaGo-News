import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticlesAPI } from '@app/API';

export const fetchArticles = createAsyncThunk(
  'api/fetchArticles',
  (_, thunkAPI: GetThunkAPI<any>) => fetchArticlesAPI(thunkAPI)
);
