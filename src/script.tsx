import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { App } from './components/App/App';
import { BrowserRouter } from 'react-router-dom';

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
