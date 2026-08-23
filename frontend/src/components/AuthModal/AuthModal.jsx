import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import "./AuthModal.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");

  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(initialMode === "login");
    }
  }, [isOpen, initialMode]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalName = name;
    let finalPhone = phone;
    const storedUsers = JSON.parse(localStorage.getItem("appUsers")) || {};

    if (!isLoginMode) {
      storedUsers[email] = { name, phone };
      localStorage.setItem("appUsers", JSON.stringify(storedUsers));
    } else {
      if (storedUsers[email]) {
        finalName = storedUsers[email].name;
        finalPhone = storedUsers[email].phone;
      } else {
        finalName = email.split("@")[0];
        finalPhone = t("mock_phone", "Телефон не указан");
      }
    }

    const userData = {
      id: Date.now(),
      email,
      name: finalName,
      phone: finalPhone,
      car: t("mock_car_status", "Не указан"),
    };

    dispatch(login(userData));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>
          {isLoginMode
            ? t("auth_login_title", "Вход")
            : t("auth_register_title", "Регистрация")}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <>
              <div className="input-group">
                <label>{t("auth_name", "Имя")}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>{t("auth_phone", "Телефон")}</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label>{t("auth_email", "Email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>{t("auth_password", "Пароль")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLoginMode
              ? t("auth_submit_login", "Войти")
              : t("auth_submit_register", "Зарегистрироваться")}
          </button>
        </form>

        <div className="modal-footer">
          {isLoginMode ? (
            <p>
              {t("auth_no_account", "Нет аккаунта?")}{" "}
              <span onClick={() => setIsLoginMode(false)}>
                {t("btn_register", "Создать")}
              </span>
            </p>
          ) : (
            <p>
              {t("auth_has_account", "Уже есть аккаунт?")}{" "}
              <span onClick={() => setIsLoginMode(true)}>
                {t("btn_login", "Войти")}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
