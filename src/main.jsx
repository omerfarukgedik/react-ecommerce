import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/global.scss';
import StoreProvider from '../StoreProvider.jsx';
import App from './App.jsx';
import Header from './components/Header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <Header />
      <App />
    </StoreProvider>
  </StrictMode>,
);
