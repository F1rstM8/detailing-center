import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import AuthModal from "./AuthModal/AuthModal";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // Состояние для режима модалки (вход или регистрация)
  
  // Достаем данные авторизации и корзины из Redux
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Функция для открытия модалки в нужном режиме
  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
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
            🛒 <span className="cart-price">{totalPrice} PLN</span>
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
                {user?.name} 
                {role === "admin" && <span className="user-role">Admin</span>}
              </Link>
              
              {role === "admin" && (
                <Link to="/admin" className="admin-link">Панель управления</Link>
              )}
              
              <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
          ) : (
            <div className="auth-links">
              <button 
                className="login-btn" 
                onClick={() => openAuthModal("login")}
              >
                Войти
              </button>
              <button 
                className="register-btn" 
                onClick={() => openAuthModal("register")}
              >
                Регистрация
              </button>
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

      {/* Рендерим модальное окно с передачей начального режима */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;