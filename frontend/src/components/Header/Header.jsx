import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import AuthModal from "../AuthModal/AuthModal";
import "./Header.scss";

const LOGO_TEXT = "D3garage";
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
  { to: "/services", key: "nav_services", defaultText: "Услуги" },
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
      <div className="header__top">
        <div className="header__top-container">
          <div className="header__top-left">
            <span className="header__info-item">
              📍 Kraków, ul. Przykładowa 12
            </span>
            <span className="header__info-item">🕒 Пн-Сб: 09:00 - 19:00</span>
          </div>

          <div className="header__top-right">
            <a
              href="mailto:info@d3garage.pl"
              className="header__info-item header__info-link"
            >
              ✉️ info@d3garage.pl
            </a>

            <a
              href="https://www.instagram.com/d3_garage_pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="header__info-item header__info-link"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ verticalAlign: "middle" }}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>

            <a href="tel:+48123456789" className="header__phone">
              📞 +48 123 456 789
            </a>

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
        </div>
      </div>

      <div className="header__main">
        <div className="header__container">
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              <span>{LOGO_TEXT}</span>
            </Link>
          </div>

          <nav className={`header__nav ${isMenuOpen ? "open" : ""}`}>
            <div className="header__mobile-logo">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <span>{LOGO_TEXT}</span>
              </Link>
            </div>

            <div className="header__nav-links">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key, link.defaultText)}
                </Link>
              ))}
            </div>

            <div className="header__mobile-info">
              <div className="mobile-info-item">
                📍 Kraków, ul. Przykładowa 12
              </div>
              <div className="mobile-info-item">🕒 Пн-Сб: 09:00 - 19:00</div>
              <a href="mailto:info@d3garage.pl" className="mobile-info-item">
                ✉️ info@d3garage.pl
              </a>
              <a
                href="https://www.instagram.com/d3_garage_pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-info-item"
              >
                📸 Instagram
              </a>
              <div className="mobile-lang-wrapper">
                <span>🌐 Язык:</span>
                <select
                  className="header__lang mobile-lang"
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
            </div>
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
