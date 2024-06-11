import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticleItemAPI } from '@app/API';

export const fetchArticleItem = createAsyncThunk(
  'api/fetchArticleItem',
  (id: string, thunkAPI: GetThunkAPI<any>) =>
    fetchArticleItemAPI(id, thunkAPI)
);
