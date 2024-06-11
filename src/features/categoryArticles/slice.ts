import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IArticle, IArticlesAPI } from '@app/types';
import { fetchCategoryArticles } from './actions';

// Define a type for the slice state
interface CategoryArticlesState {
  categoryArticles: IArticle[];
  isLoading: boolean;
  error: any;
}

// Define the initial state using that type
const initialState: CategoryArticlesState = {
  categoryArticles: [],
  isLoading: false,
  error: '',
};

export const categoryArticlesSlice = createSlice({
  name: 'categoryArticles',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategoryArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCategoryArticles.fulfilled,
      (state, action: PayloadAction<IArticlesAPI>) => {
        state.isLoading = false;
        state.error = '';
        state.categoryArticles = action.payload.results;
      }
    );
    builder.addCase(
      fetchCategoryArticles.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectCategoryArticles = (state: RootState) =>
  state.categoryArticles.categoryArticles;

export default categoryArticlesSlice.reducer;
