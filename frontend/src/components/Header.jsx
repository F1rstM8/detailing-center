import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import { useTranslation } from "react-i18next"; // 1. Импортируем хук перевода
import AuthModal from "./AuthModal/AuthModal";
import "./Header.scss";

const Header = () => {
  const { t, i18n } = useTranslation(); // 2. Инициализируем i18n
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // 3. Функция для смены языка
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
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

        {/* Навигация (теперь с поддержкой перевода) */}
        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/portfolio">{t("nav_portfolio")}</Link>
          <Link to="/blog">{t("nav_blog")}</Link>
          <Link to="/contacts">{t("nav_contacts")}</Link>
        </nav>

        {/* Действия (Корзина, Язык) */}
        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span className="cart-price">{totalPrice} PLN</span>
          </Link>

          {/* 4. Возвращаем обработчик onChange и привязываем value к текущему языку */}
          <select 
            className="header__lang" 
            onChange={handleLanguageChange} 
            value={i18n.language}
          >
            <option value="ru">Русский</option>
            <option value="pl">Polski</option>
            {/* Опцию English убрал, так как в словаре пока только ru и pl */}
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

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;