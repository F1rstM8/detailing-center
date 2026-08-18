import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import AuthModal from "../AuthModal/AuthModal";
import "./Header.scss";

const LOGO_TEXT = "d3garage";
const CURRENCY = "PLN";

const ROLES = {
  ADMIN: "admin",
};

const AUTH_MODES = {
  LOGIN: "login",
  REGISTER: "register",
};

const LANGUAGES = [
  { value: "ru", label: "Русский" },
  { value: "pl", label: "Polski" },
];

const NAV_LINKS = [
  { to: "/portfolio", key: "nav_portfolio", defaultText: "Портфолио" },
  { to: "/blog", key: "nav_blog", defaultText: "Блог" },
  { to: "/contacts", key: "nav_contacts", defaultText: "Контакты" },
];

const MOCK_CLIENT_NAMES = ["Постоянный клиент", "Stały klient"];

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(AUTH_MODES.LOGIN);

  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.cart);

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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isAdmin = role === ROLES.ADMIN;

  const displayName = MOCK_CLIENT_NAMES.includes(user?.name)
    ? t("mock_client_name", "Постоянный клиент")
    : user?.name || user?.email?.split("@")[0];

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            <span>{LOGO_TEXT}</span>
          </Link>
        </div>

        <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {t(link.key, link.defaultText)}
            </Link>
          ))}
        </nav>

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
                onClick={() => openAuthModal(AUTH_MODES.LOGIN)}
              >
                {t("btn_login", "Войти")}
              </button>
              <button
                className="register-btn"
                onClick={() => openAuthModal(AUTH_MODES.REGISTER)}
              >
                {t("btn_register", "Регистрация")}
              </button>
            </div>
          )}
        </div>

        <div className="header__actions">
          <Link to="/cart" className="header__cart">
            🛒{" "}
            <span className="cart-price">
              {totalPrice} {CURRENCY}
            </span>
          </Link>

          <select
            className="header__lang"
            onChange={handleLanguageChange}
            value={i18n.language}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`header__burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={
            isMenuOpen
              ? t("aria_close_menu", "Закрыть меню")
              : t("aria_open_menu", "Открыть меню")
          }
          aria-expanded={isMenuOpen}
        >
          <span className="burger-line"></span>
        </button>
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
