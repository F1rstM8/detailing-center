import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/authSlice";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@test.com") {
      dispatch(
        login({
          user: { name: "admin", email: "admin@test.com", phone: "+48 111 222 333", car: "Service Car" },
          role: "admin",
        })
      );
      navigate("/admin");
      return;
    }

    dispatch(
      login({
        user: { name: email.split("@")[0], email: email, phone: "+48 000 000 000", car: "Toyota Prius+" },
        role: "client",
      })
    );
    navigate("/profile");
  };

  return (
    <main className="page-content login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Вход в систему</h2>
          <p className="subtitle">Введите свои данные для доступа к личному кабинету</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="admin@test.com или ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Войти</button>
          </form>

          <div className="login-footer">
            <span>Нет аккаунта?</span>
            <Link to="/register" className="register-link">Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;