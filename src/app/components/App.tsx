import React, { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { AdminPage } from '../../features/admin/AdminPage/AdminPage';
import { PrivateRouteWrapper } from '../../components/PrivateRouteWrapper/PrivateRouteWrapper';
import { LoginContainer } from '../../features/auth/login/LoginContainer';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage';
import { AdminArticles } from '@features/admin/AdminArticles/AdminArticles';
import { AdminArticleItem } from '@features/admin/AdminArticleItem/AdminArticleItem';
import { ArticlePage } from '@features/articleItem/components/ArticlePage';
import { HomePage } from '@components/HomePage/HomePage';

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
        path="/"
        element={
          <Page>
            <HomePage />
          </Page>
        }
      ></Route>
      <Route
        path="/:category"
        element={
          <Page>
            <CategoryPage />
          </Page>
        }
      ></Route>
      <Route
        path="/article/:id"
        element={
          <Page>
            <ArticlePage />
          </Page>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <Page>
            <LoginContainer />
          </Page>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <PrivateRouteWrapper
            element={
              <AdminPage>
                <AdminArticles />
              </AdminPage>
            }
          />
        }
      ></Route>
      <Route
        path="/admin/create"
        element={
          <PrivateRouteWrapper
            element={
              <AdminPage>
                <AdminArticleItem />
              </AdminPage>
            }
          />
        }
      ></Route>
      <Route
        path="/admin/edit/:id"
        element={
          <PrivateRouteWrapper
            element={
              <AdminPage>
                <AdminArticleItem />
              </AdminPage>
            }
          />
        }
      ></Route>
    </Routes>
  );
};
