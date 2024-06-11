import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { IArticle, IArticlesAPI } from '@app/types';
import { fetchSamePlaceArticles } from './actions';

// Define a type for the slice state
interface SamePlaceArticlesState {
  samePlaceArticles: IArticle[];
  samePlaceArticlesIsLoading: boolean;
  samePlaceArticlesError: any;
}

// Define the initial state using that type
const initialState: SamePlaceArticlesState = {
  samePlaceArticles: [],
  samePlaceArticlesIsLoading: false,
  samePlaceArticlesError: '',
};

export const samePlaceArticlesSlice = createSlice({
  name: 'samePlaceArticles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSamePlaceArticles.pending, (state) => {
      state.samePlaceArticlesIsLoading = true;
    });
    builder.addCase(
      fetchSamePlaceArticles.fulfilled,
      (state, action: PayloadAction<IArticlesAPI>) => {
        state.samePlaceArticlesIsLoading = false;
        state.samePlaceArticlesError = '';
        state.samePlaceArticles = action.payload.results;
      }
    );
    builder.addCase(
      fetchSamePlaceArticles.rejected,
      (state, action) => {
        state.samePlaceArticlesIsLoading = false;
        state.samePlaceArticlesError = action.payload;
      }
    );
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectSamePlaceArticles = (state: RootState) =>
  state.articleItem.articleItem;

export default samePlaceArticlesSlice.reducer;
