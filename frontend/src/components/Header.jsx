import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import { useTranslation } from "react-i18next";
import AuthModal from "./AuthModal/AuthModal";
import "./Header.scss";

const Header = () => {
  const { t, i18n } = useTranslation();
  
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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  // Проверяем, является ли пользователь администратором
  const isAdmin = role === "admin";

  // Динамический перевод имени пользователя (для мок-данных)
  const displayName = (user?.name === "Постоянный клиент" || user?.name === "Stały klient")
    ? t("mock_client_name", "Постоянный клиент")
    : (user?.name || user?.email?.split('@')[0]);

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
          <Link to="/portfolio">{t("nav_portfolio", "Портфолио")}</Link>
          <Link to="/blog">{t("nav_blog", "Блог")}</Link>
          <Link to="/contacts">{t("nav_contacts", "Контакты")}</Link>
        </nav>

        {/* Действия (Корзина, Язык) */}
        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒 <span className="cart-price">{totalPrice} PLN</span>
          </Link>

          <select 
            className="header__lang" 
            onChange={handleLanguageChange} 
            value={i18n.language}
          >
            <option value="ru">Русский</option>
            <option value="pl">Polski</option>
          </select>
        </div>

        {/* Авторизация и профиль */}
        <div className="header__auth">
          {isAuthenticated ? (
            <div className="user-profile">
              <Link to="/profile" className="user-name-link">
                {/* Если админ - показываем только бейдж, иначе - переведенное имя */}
                {isAdmin ? (
                  <span className="user-role">ADMIN</span>
                ) : (
                  displayName
                )}
              </Link>
              
              {/* Показываем ссылку только админу */}
              {isAdmin && (
                <Link to="/admin" className="admin-link">
                  {t("nav_admin_panel", "Панель управления")}
                </Link>
              )}
              
              <button onClick={handleLogout} className="logout-btn">
                {t("btn_logout", "Выйти")}
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <button 
                className="login-btn" 
                onClick={() => openAuthModal("login")}
              >
                {t("btn_login", "Войти")}
              </button>
              <button 
                className="register-btn" 
                onClick={() => openAuthModal("register")}
              >
                {t("btn_register", "Регистрация")}
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