import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@app/store';
import { IArticle, IArticlesAPI } from '@app/types';
import { fetchArticles } from './actions';

// Define a type for the slice state
interface ArticlesState {
  articles: IArticle[];
  articlesIsLoading: boolean;
  articlesError: any;
}

// Define the initial state using that type
const initialState: ArticlesState = {
  articles: [],
  articlesIsLoading: false,
  articlesError: '',
};

export const articlesSlice = createSlice({
  name: 'articles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArticles.pending, (state) => {
      state.articlesIsLoading = true;
    });
    builder.addCase(
      fetchArticles.fulfilled,
      (state, action: PayloadAction<IArticlesAPI>) => {
        state.articlesIsLoading = false;
        state.articlesError = '';
        state.articles = action.payload.results;
      }
    );
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.articlesIsLoading = false;
      state.articlesError = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectArticles = (state: RootState) =>
  state.articles.articles;

export default articlesSlice.reducer;
