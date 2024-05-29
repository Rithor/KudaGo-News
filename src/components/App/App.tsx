import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Page } from '../Page/Page';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import { PrivateRouteWrapper } from '../PrivateRouteWrapper/PrivateRouteWrapper';
import { LoginContainer } from '../../features/auth/login/LoginContainer';
import { ArticlePage } from '../ArticlePage/ArticlePage';
import { CategoryPage } from '../CategoryPage/CategoryPage';
import { HomePage } from '../HomePage/HomePage';

export const App = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
