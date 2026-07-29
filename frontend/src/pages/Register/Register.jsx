import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Простейшая валидация
    if (password !== confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }

    // Имитация успешной регистрации:
    // Сразу авторизуем пользователя и всегда даем ему роль 'client'
    dispatch(
      loginSuccess({
        user: { name, email },
        role: "client",
      })
    );

    // Перенаправляем на главную
    navigate("/");
  };

  return (
    <main className="page-content register-page">
      <div className="register-container">
        <h2>Регистрация</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться?"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Придумайте пароль"
              required
            />
          </div>

          <div className="form-group">
            <label>Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              required
            />
          </div>

          <button type="submit" className="register-submit-btn">
            Зарегистрироваться
          </button>
        </form>

        <p className="login-redirect">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;