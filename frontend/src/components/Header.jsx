import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // 1. Импортируем хук
import './Header.scss';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  // 2. Достаем функции перевода (t) и управления языком (i18n)
  const { t, i18n } = useTranslation();

  // 3. Функция, которая срабатывает при выборе языка в выпадающем списке
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <img src="/logo.png" alt="d3garage логотип" className="header__logo-img" />
            <span>d3garage</span>
          </Link>
        </div>

        <nav className="header__nav">
          {/* 4. Заменяем обычный текст на функцию t('ключ_из_словаря') */}
          <Link to="/">{t('nav_services')}</Link>
          <Link to="/">{t('nav_portfolio')}</Link>
          <Link to="/">{t('nav_blog')}</Link>
          <Link to="/">{t('nav_contacts')}</Link>
        </nav>

        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span>{cartItems.length}</span>
          </Link>
          
          {/* 5. Привязываем функцию changeLanguage к нашему селекту */}
          <select 
            className="header__lang" 
            onChange={changeLanguage} 
            defaultValue={i18n.language}
          >
            <option value="ru">Русский</option>
            <option value="pl">Polski</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;