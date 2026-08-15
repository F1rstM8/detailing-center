import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useTranslation } from "react-i18next"; // <-- Импортируем хук перевода
import "./AuthModal.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // <-- Инициализируем хук
  
  // Устанавливаем режим в зависимости от того, на какую кнопку нажали
  const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");

  // Синхронизируем состояние при каждом открытии модалки
  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(initialMode === "login");
    }
  }, [isOpen, initialMode]);

  // Состояния полей формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Формируем данные пользователя
    const userData = {
      id: Date.now(),
      email,
      name: isLoginMode ? t("mock_client_name", "Постоянный клиент") : name,
      phone: isLoginMode ? "+48 111 222 333" : phone,
      car: t("mock_car_status", "Не указан"),
    };

    dispatch(login(userData)); 
    onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        {/* Переводим заголовок в зависимости от режима */}
        <h2>{isLoginMode ? t("auth_login_title", "Вход") : t("auth_register_title", "Регистрация")}</h2>

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
            {isLoginMode ? t("auth_submit_login", "Войти") : t("auth_submit_register", "Зарегистрироваться")}
          </button>
        </form>

        <div className="modal-footer">
          {isLoginMode ? (
            <p>
              {t("auth_no_account", "Нет аккаунта?")}{" "}
              <span onClick={() => setIsLoginMode(false)}>{t("btn_register", "Создать")}</span>
            </p>
          ) : (
            <p>
              {t("auth_has_account", "Уже есть аккаунт?")}{" "}
              <span onClick={() => setIsLoginMode(true)}>{t("btn_login", "Войти")}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;