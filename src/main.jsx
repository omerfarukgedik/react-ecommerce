import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/global.scss';
import StoreProvider from './StoreProvider.jsx';
import App from './App.jsx';
import Header from './components/Header.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className='flex flex-col gap-2 lg:gap-10'>
          <Header />
          <App />
        </div>
      </StoreProvider>
    </QueryClientProvider>
  </StrictMode>,
);
