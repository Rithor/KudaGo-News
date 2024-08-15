import React, { Suspense, lazy, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage';
import { ArticlePage } from '@features/articleItem/components/ArticlePage';
import { Page } from '@components/Page/Page';
import { HomePage } from '@components/HomePage/HomePage';

const Admin = lazy(() => import('@app/components/Admin'));

export const App = () => {
  const { pathname } = useLocation();
  const prevPathName = useRef(pathname);
  React.useEffect(() => {
    if (pathname !== prevPathName.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div>Loading</div>}>
            <Admin />
          </Suspense>
        }
      />
      <Route
        path="/"
        element={
          <Page>
            <HomePage />
          </Page>
        }
      />
      <Route
        path="/:category"
        element={
          <Page>
            <CategoryPage />
          </Page>
        }
      />
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticlePage />
          </Page>
        }
      />
    </Routes>
  );
};
