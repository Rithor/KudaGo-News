import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { FullArticle } from '../FullArticle/FullArticle';
import { Page } from '../Page/Page';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';
import PrivateRouteWrapper from '../PrivateRouteWrapper/PrivateRouteWrapper';
import { LoginContainer } from '../../features/auth/login/LoginContainer';

export const App = () => {
  // console.log(`render App`);

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
            <Articles />
          </Page>
        }
      ></Route>
      <Route
        path="/:category"
        element={
          <Page>
            <Articles />
          </Page>
        }
      ></Route>
      <Route
        path="/fullarticle/:id"
        element={
          <Page>
            <FullArticle />
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
