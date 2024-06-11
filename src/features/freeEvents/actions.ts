import { GetThunkAPI, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFreeEventsAPI } from '@app/API';

export const fetchFreeEvents = createAsyncThunk(
  'api/fetchFreeEvents',
  (_, thunkAPI: GetThunkAPI<any>) => fetchFreeEventsAPI(thunkAPI)
);
