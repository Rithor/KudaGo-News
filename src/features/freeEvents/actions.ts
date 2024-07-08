import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFreeEventsAPI } from '@app/API_public';

export const fetchFreeEvents = createAsyncThunk(
  'api/fetchFreeEvents',
  (_, thunkAPI: GetThunkAPI<any>) => fetchFreeEventsAPI(thunkAPI)
);
