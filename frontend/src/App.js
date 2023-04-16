import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import ForgotPage from './pages/ForgotPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<LoginPage />} />
      <Route path="/home" index element={<MapPage />} />
      <Route path="/forgotPassword" index element={<ForgotPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;