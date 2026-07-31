import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import "./AuthModal.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const dispatch = useDispatch();
  
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
      name: isLoginMode ? "Постоянный клиент" : name,
      phone: isLoginMode ? "+48 111 222 333" : phone,
      car: "Не указан",
    };

    dispatch(login(userData)); 
    onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>{isLoginMode ? "Вход в кабинет" : "Регистрация"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <>
              <div className="input-group">
                <label>Имя</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="input-group">
                <label>Телефон</label>
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
            <label>Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label>Пароль</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLoginMode ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="modal-footer">
          {isLoginMode ? (
            <p>Нет аккаунта? <span onClick={() => setIsLoginMode(false)}>Создать</span></p>
          ) : (
            <p>Уже есть аккаунт? <span onClick={() => setIsLoginMode(true)}>Войти</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;