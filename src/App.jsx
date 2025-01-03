import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Detail from './pages/detail.jsx';

const App = () => {
  return (
    <div className='mt-[6rem] lg:mt-[5rem]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path=':id' element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
