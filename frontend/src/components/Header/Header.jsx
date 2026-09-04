import  { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import AuthModal from "../AuthModal/AuthModal";
import HeaderTop from "./HeaderTop";
import LanguageSelector from "./LanguageSelector";
import AuthBlock from "./AuthBlock";
import { COMPANY_CONTACTS } from "../../data/companyInfo.js";
import "./Header.scss";

const LOGO_TEXT = "D3garage";
const CURRENCY = "PLN";

const NAV_LINKS = [
  { to: "/services", key: "nav_services", defaultText: "Услуги" },
  { to: "/portfolio", key: "nav_portfolio", defaultText: "Портфолио" },
  { to: "/blog", key: "nav_blog", defaultText: "Блог" },
  { to: "/contacts", key: "nav_contacts", defaultText: "Контакты" },
];

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const { totalPrice } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <HeaderTop />

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
                📍 {COMPANY_CONTACTS.address}
              </div>
              <div className="mobile-info-item">
                🕒 {t("contacts_working_hours_short")}
              </div>
              <a
                href={`mailto:${COMPANY_CONTACTS.email}`}
                className="mobile-info-item"
              >
                ✉️ {COMPANY_CONTACTS.email}
              </a>
              <a
                href={COMPANY_CONTACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-info-item"
              >
                📸 Instagram
              </a>
              <div className="mobile-lang-wrapper">
                <span>🌐 Язык:</span>
                <LanguageSelector className="mobile-lang" />
              </div>

              {isAuthenticated && (
                <div className="mobile-auth-wrapper">
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    {t("btn_logout", "Выйти")}
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="header__auth">
            <AuthBlock
              isAuthenticated={isAuthenticated}
              user={user}
              role={role}
              onLogout={handleLogout}
              onOpenAuthModal={openAuthModal}
            />
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
