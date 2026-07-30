import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 1. Достаем данные авторизации и корзины из Redux
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header__container">
        
        {/* Логотип */}
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <span>d3garage</span>
          </Link>
        </div>

        {/* Навигация */}
        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/portfolio">Портфолио</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/contacts">Контакты</Link>
        </nav>

        {/* Действия (Корзина, Язык) */}
        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span className="cart-price">{totalPrice} PLN</span> {/* 2. Выводим реальную сумму */}
          </Link>

          <select className="header__lang">
            <option value="ru">Русский</option>
            <option value="pl">Polski</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Авторизация и профиль */}
        <div className="header__auth">
          {isAuthenticated ? (
            <div className="user-profile">
              <Link to="/profile" className="user-name-link">
                {user.name} 
                {role === "admin" && <span className="user-role">Admin</span>}
              </Link>
              
              {role === "admin" && (
                <Link to="/admin" className="admin-link">Панель управления</Link>
              )}
              
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">Войти</Link>
              <Link to="/register" className="register-btn">Регистрация</Link>
            </div>
          )}
        </div>

        {/* Бургер-меню для мобилок */}
        <div 
          className="header__burger" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
};

export default Header;