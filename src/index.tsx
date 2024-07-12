import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './common.css';
import { App } from './app/components/App';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { NetworkStatusContextProvider } from '@features/networkStatus/NetworkStatusContextProvider';

const mainNavigator = navigator as Navigator;
if ('serviceWorker' in mainNavigator) {
  window.addEventListener('load', function () {
    mainNavigator.serviceWorker
      .register('/sw.js?')
      .then(function () {
        // eslint-disable-next-line no-console
        console.log('Service Worker Registered!!');
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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NetworkStatusContextProvider>
    </Provider>
    // </React.StrictMode>
  );
}
