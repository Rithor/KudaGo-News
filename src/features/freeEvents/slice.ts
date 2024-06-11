import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { IArticle, IArticlesAPI } from '@app/types';
import { fetchFreeEvents } from './actions';

// Define a type for the slice state
interface FreeEventsState {
  freeEvents: IArticle[];
  freeEventsIsLoading: boolean;
  freeEventsError: any;
}

// Define the initial state using that type
const initialState: FreeEventsState = {
  freeEvents: [],
  freeEventsIsLoading: false,
  freeEventsError: '',
};

export const freeEventsSlice = createSlice({
  name: 'freeEvents',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFreeEvents.pending, (state) => {
      state.freeEventsIsLoading = true;
    });
    builder.addCase(
      fetchFreeEvents.fulfilled,
      (state, action: PayloadAction<IArticlesAPI>) => {
        state.freeEventsIsLoading = false;
        state.freeEventsError = '';
        state.freeEvents = action.payload.results;
      }
    );
    builder.addCase(fetchFreeEvents.rejected, (state, action) => {
      state.freeEventsIsLoading = false;
      state.freeEventsError = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectFreeEvents = (state: RootState) =>
  state.freeEvents.freeEvents;

export default freeEventsSlice.reducer;
