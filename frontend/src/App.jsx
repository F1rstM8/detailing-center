import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Blog from './pages/Blog/Blog';
import Portfolio from './pages/Portfolio/Portfolio';
import Contacts from './pages/Contacts/Contacts';

// Создаем новый компонент, который объединяет все наши секции
const LandingPage = () => {
  return (
    <>
      <Home />
      <Portfolio />
      <Blog />
      <Contacts />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* По корневому адресу теперь грузится весь LandingPage целиком */}
        <Route path="/" element={<LandingPage />} />
        {/* Корзина остается отдельной страницей */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 