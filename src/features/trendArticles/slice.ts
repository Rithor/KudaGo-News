import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { IArticle, IArticlesAPI } from '@app/types';
import { fetchTrendArticles } from './actions';

// Define a type for the slice state
interface TrendArticlesState {
  trendArticles: IArticle[];
  trendArticlesIsLoading: boolean;
  trendArticlesError: any;
}

// Define the initial state using that type
const initialState: TrendArticlesState = {
  trendArticles: [],
  trendArticlesIsLoading: false,
  trendArticlesError: '',
};

export const trendArticlesSlice = createSlice({
  name: 'trendArticles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTrendArticles.pending, (state) => {
      state.trendArticlesIsLoading = true;
    });
    builder.addCase(
      fetchTrendArticles.fulfilled,
      (state, action: PayloadAction<IArticlesAPI>) => {
        state.trendArticlesIsLoading = false;
        state.trendArticlesError = '';
        state.trendArticles = action.payload.results;
      }
    );
    builder.addCase(fetchTrendArticles.rejected, (state, action) => {
      state.trendArticlesIsLoading = false;
      state.trendArticlesError = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectTrendArticles = (state: RootState) =>
  state.trendArticles.trendArticles;

export default trendArticlesSlice.reducer;
