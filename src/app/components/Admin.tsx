import React, { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { Page } from '@components/Page/Page';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { PrivateRouteWrapper } from '@components/PrivateRouteWrapper/PrivateRouteWrapper';
import { AdminPage } from '@features/admin/AdminPage/AdminPage';
import { AdminArticles } from '@features/admin/AdminArticles/AdminArticles';
import { AdminArticleItem } from '@features/admin/AdminArticleItem/AdminArticleItem';
import { initializeFirebase } from '@app/API';

const firebaseApp = initializeFirebase();

const Admin: FC = () => {
  return (
    <AuthContextProvider firebaseApp={firebaseApp}>
      <Routes>
        <Route
          path="/"
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
          path="/login"
          element={
            <Page>
              <LoginContainer />
            </Page>
          }
        ></Route>
        <Route
          path="/create"
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
          path="/edit/:id"
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
      <Outlet />
    </AuthContextProvider>
  );
};

export default Admin;
