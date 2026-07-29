import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Добавили useDispatch
import { useTranslation } from 'react-i18next';
import { logout } from "../redux/authSlice";
import './Header.scss';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  // Достаем статус авторизации, данные пользователя и роль из нашего нового слайса
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    dispatch(logout());
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
          <Link to="/">{t('nav_services')}</Link>
          <Link to="/">{t('nav_portfolio')}</Link>
          <Link to="/">{t('nav_blog')}</Link>
          <Link to="/">{t('nav_contacts')}</Link>
        </nav>

        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span>{cartItems.length}</span>
          </Link>
          
          <select 
            className="header__lang" 
            onChange={changeLanguage} 
            defaultValue={i18n.language}
          >
            <option value="ru">Русский</option>
            <option value="pl">Polski</option>
          </select>

          {/* --- БЛОК АВТОРИЗАЦИИ --- */}
          <div className="header__auth">
            {isAuthenticated ? (
              <div className="user-profile">
                <span className="user-name">
                  {user?.name} <span className="user-role">({role})</span>
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="login-link">Войти</Link>
                <Link to="/register" className="register-btn">Регистрация</Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;