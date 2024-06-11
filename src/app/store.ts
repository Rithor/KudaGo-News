import categoryArticlesReducer from '@features/categoryArticles/slice';
import articleItemReducer from '@features/articleItem/slice';
import samePlaceArticlesReducer from '@features/samePlaceArticles/slice';
import articlesReducer from '@features/articles/slice';
import trendArticlesReducer from '@features/trendArticles/slice';
import freeEventsReducer from '@features/freeEvents/slice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    categoryArticles: categoryArticlesReducer,
    articleItem: articleItemReducer,
    samePlaceArticles: samePlaceArticlesReducer,
    articles: articlesReducer,
    trendArticles: trendArticlesReducer,
    freeEvents: freeEventsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
