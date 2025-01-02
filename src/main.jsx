import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/global.scss';
import App from './App.jsx';
import StoreProvider from '../StoreProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);
