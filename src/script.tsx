import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeFirebase } from './API';
import './style.css';
import { App } from './components/App/App';
import { AuthContextProvider } from './features/auth/AuthContextProvider';

const firebaseApp = initializeFirebase();

const element = document.getElementById('root');
if (element) {
  createRoot(element).render(
    <React.StrictMode>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </React.StrictMode>
  );
}
