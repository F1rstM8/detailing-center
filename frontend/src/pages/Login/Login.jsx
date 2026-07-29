import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Назначаем роль на основе email (Mock-авторизация)
    let role = "client";
    if (email === "admin@test.com") role = "admin";
    if (email === "manager@test.com") role = "manager";

    // Получаем имя из email (до символа @) для красоты
    const name = email.split("@")[0];

    // Отправляем данные в Redux
    dispatch(
      loginSuccess({
        user: { name, email },
        role,
      })
    );

    // Перенаправляем на главную
    navigate("/");
  };

  return (
    <main className="page-content login-page">
      <div className="login-container">
        <h2>Вход в систему</h2>

        <form onSubmit={handleLogin} className="login-form">
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
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Войти
          </button>
        </form>

        <p className="register-redirect">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;