import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer'; // Импортируем Footer

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Blog from './pages/Blog/Blog';
import Portfolio from './pages/Portfolio/Portfolio';
import Contacts from './pages/Contacts/Contacts';

const LandingPage = () => {
  return (
    <>
      <Hero />
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
      {/* Контейнер для прижатия футера к низу */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        {/* Основной контент */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>

        <Footer /> {/* Вставляем футер в самом конце */}
      </div>
    </BrowserRouter>
  );
}

export default App;