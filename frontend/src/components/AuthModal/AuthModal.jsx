import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import "./AuthModal.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(initialMode === "login");
    }
  }, [isOpen, initialMode]);

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
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button 
          className="close-btn" 
          onClick={onClose}
          
          aria-label={t("aria_close_menu", "Закрыть окно")}
        >
          ✕
        </button>

        <h2 id="auth-modal-title">
          {isLoginMode ? t("auth_login_title", "Вход") : t("auth_register_title", "Регистрация")}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <>
              <div className="input-group">
                
                <label htmlFor="auth-name">{t("auth_name", "Имя")}</label>
                <input 
                  id="auth-name"
                  type="text" 
                  required 
                  autoFocus 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label htmlFor="auth-phone">{t("auth_phone", "Телефон")}</label>
                <input 
                  id="auth-phone"
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label htmlFor="auth-email">{t("auth_email", "Email")}</label>
            <input 
              id="auth-email"
              type="email" 
              required 
              autoFocus={isLoginMode} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="auth-password">{t("auth_password", "Пароль")}</label>
            <input 
              id="auth-password"
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLoginMode ? t("auth_submit_login", "Войти") : t("auth_submit_register", "Зарегистрироваться")}
          </button>
        </form>

        <div className="modal-footer">
          {isLoginMode ? (
            <p>
              {t("auth_no_account", "Нет аккаунта?")}{" "}
              {/* 4. Заменили span на семантичный button */}
              <button 
                type="button" 
                className="text-btn" 
                onClick={() => setIsLoginMode(false)}
              >
                {t("btn_register", "Создать")}
              </button>
            </p>
          ) : (
            <p>
              {t("auth_has_account", "Уже есть аккаунт?")}{" "}
              <button 
                type="button" 
                className="text-btn" 
                onClick={() => setIsLoginMode(true)}
              >
                {t("btn_login", "Войти")}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;