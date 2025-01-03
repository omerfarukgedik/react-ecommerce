import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Detail from './pages/detail.jsx';
import Header from './components/Header.jsx';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col gap-2 lg:gap-10'>
          <Header />
          <div className='mt-[6rem] lg:mt-[5rem]'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path=':id' element={<Detail />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
