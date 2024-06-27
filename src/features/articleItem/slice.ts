import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IArticle } from '@app/types';
import { fetchArticleItem } from './actions';

// Define a type for the slice state
interface ArticleItemState {
  articleItem: IArticle;
  isLoading: boolean;
  error: any;
}

// Define the initial state using that type
const initialState: ArticleItemState = {
  articleItem: {
    id: 0,
    publication_date: 0,
    dates: [],
    title: '',
    slug: '',
    place: {
      id: 0,
      title: '',
    },
    description: '',
    body_text: '',
    location: {
      slug: '',
    },
    categories: [],
    tagline: '',
    age_restriction: 0,
    price: '',
    is_free: false,
    images: [
      {
        image: '',
        source: {
          name: '',
          link: '',
        },
      },
    ],
    favorites_count: 0,
    comments_count: 0,
    site_url: '',
    short_title: '',
    tags: [],
    disable_comments: false,
    participants: [],
  },
  isLoading: false,
  error: '',
};

function updateLinks(action: PayloadAction<IArticle>) {
  const container = document.createElement('div');
  container.innerHTML = action.payload.body_text;
  container.querySelectorAll('a').forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'nofollow');
  });
  action.payload.body_text = container.outerHTML;
}

export const articleItemSlice = createSlice({
  name: 'articleItem',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchArticleItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticleItem.fulfilled,
      (state, action: PayloadAction<IArticle>) => {
        state.isLoading = false;
        state.error = '';
        updateLinks(action);
        state.articleItem = action.payload;
      }
    );
    builder.addCase(fetchArticleItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectArticleItem = (state: RootState) =>
  state.articleItem.articleItem;

export default articleItemSlice.reducer;
