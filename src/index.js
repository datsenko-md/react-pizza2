/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
