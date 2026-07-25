import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';

const Header = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  
  // Создаем состояние для мобильного меню (false = закрыто)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция переключения
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Функция для закрытия меню после клика по ссылке
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      
      <div className="header__logo">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={closeMenu}>
          <h2>Detailing Center</h2>
        </Link>
      </div>
      
      {/* Если isMenuOpen === true, добавляется класс 'open' */}
      <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`}>
        <a href="/#services" onClick={closeMenu}>Услуги и цены</a>
        <a href="/#portfolio" onClick={closeMenu}>Портфолио</a>
        <a href="/#blog" onClick={closeMenu}>Блог</a>
        <a href="/#contacts" onClick={closeMenu}>Контакты</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }} onClick={closeMenu}>
          <div style={{ fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
            🛒 <span style={{ color: '#fff' }}>{items.length}</span> 
            {/* Скрываем сумму на мобильных, оставляем только иконку и количество */}
            <span style={{ color: '#4caf50', marginLeft: '8px' }} className="cart-price">
              {totalPrice > 0 ? `(${totalPrice} €)` : ''}
            </span>
          </div>
        </Link>

        <div className="header__lang">
          <select defaultValue="ru">
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>

        {/* Сама кнопка Бургера (три полоски) */}
        <div className="header__burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
};

export default Header;