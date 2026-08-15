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

  const isAdmin = role === "admin";

  const displayName = (user?.name === "Постоянный клиент" || user?.name === "Stały klient")
    ? t("mock_client_name", "Постоянный клиент")
    : (user?.name || user?.email?.split('@')[0]);

  const navLinks = [
    { to: "/portfolio", key: "nav_portfolio", defaultText: "Портфолио" },
    { to: "/blog", key: "nav_blog", defaultText: "Блог" },
    { to: "/contacts", key: "nav_contacts", defaultText: "Контакты" },
  ];

  return (
    <header className="header">
      <div className="header__container">
        
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <span>d3garage</span>
          </Link>
        </div>

        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {t(link.key, link.defaultText)}
            </Link>
          ))}
        </nav>

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

        <div className="header__auth">
          {isAuthenticated ? (
            <div className="user-profile">
              <Link to="/profile" className="user-name-link">
                {isAdmin ? (
                  <span className="user-role">ADMIN</span>
                ) : (
                  displayName
                )}
              </Link>
              
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