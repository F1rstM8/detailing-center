
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ROLES = {
  ADMIN: "admin",
};

const AUTH_MODES = {
  LOGIN: "login",
  REGISTER: "register",
};

const MOCK_CLIENT_NAMES = ["Постоянный клиент", "Stały klient"];

const AuthBlock = ({
  isAuthenticated,
  user,
  role,
  onLogout,
  onOpenAuthModal,
}) => {
  const { t } = useTranslation();
  const isAdmin = role === ROLES.ADMIN;

  const displayName = MOCK_CLIENT_NAMES.includes(user?.name)
    ? t("mock_client_name", "Постоянный клиент")
    : user?.name || user?.email?.split("@")[0];

  if (isAuthenticated) {
    return (
      <div className="user-profile">
        <Link to="/profile" className="user-name-link">
          {isAdmin ? <span className="user-role">ADMIN</span> : displayName}
        </Link>

        {isAdmin && (
          <Link to="/admin" className="admin-link">
            {t("nav_admin_panel", "Панель управления")}
          </Link>
        )}

        <button onClick={onLogout} className="logout-btn">
          {t("btn_logout", "Выйти")}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-links">
      <button
        className="login-btn"
        onClick={() => onOpenAuthModal(AUTH_MODES.LOGIN)}
      >
        {t("btn_login", "Войти")}
      </button>
      <button
        className="register-btn"
        onClick={() => onOpenAuthModal(AUTH_MODES.REGISTER)}
      >
        {t("btn_register", "Регистрация")}
      </button>
    </div>
  );
};

export default AuthBlock;
