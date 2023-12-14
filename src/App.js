/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import SearchProvider from './context/SearchProvider';

function App() {
  return (
    <div className="wrapper">
      <SearchProvider>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchProvider>
    </div>
  );
}

export default App;
