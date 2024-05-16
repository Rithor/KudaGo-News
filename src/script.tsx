import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { initializeFirebase } from './API';
import './style.css';
import { App } from './components/App/App';

initializeFirebase();

const element = document.getElementById('root');
if (element) {
  const root = createRoot(element);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
