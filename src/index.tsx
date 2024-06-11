import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeFirebase } from './app/API';
import './common.css';
import { App } from './app/components/App';
import { AuthContextProvider } from './features/auth/AuthContextProvider';
import { Provider } from 'react-redux';
import { store } from '@app/store';

const firebaseApp = initializeFirebase();

const element = document.getElementById('root');
if (element) {
  createRoot(element).render(
    // <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
    // </React.StrictMode>
  );
}
