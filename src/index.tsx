import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeFirebase } from './app/API';
import './common.css';
import { App } from './app/components/App';
import { AuthContextProvider } from './features/auth/AuthContextProvider';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';

const firebaseApp = initializeFirebase();

const mainNavigator = navigator as Navigator;
if ('serviceWorker' in mainNavigator) {
  window.addEventListener('load', function () {
    mainNavigator.serviceWorker
      .register('/sw.js?')
      .then(function () {
        // console.log('Service Worker Registered!!');
      })
      .catch((e) => console.error('cant register SW', e));
  });
}

const element = document.getElementById('root');
if (element) {
  createRoot(element).render(
    // <React.StrictMode>
    <Provider store={store}>
      <NetworkStatusContextProvider>
        <AuthContextProvider firebaseApp={firebaseApp}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthContextProvider>
      </NetworkStatusContextProvider>
    </Provider>
    // </React.StrictMode>
  );
}
