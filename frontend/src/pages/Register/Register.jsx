import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../../redux/authSlice";
import "./Register.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }

    // Сохраняем расширенные данные в Redux
    dispatch(
      loginSuccess({
        user: { name, email, phone, car },
        role: "client",
      })
    );

    navigate("/");
  };

  return (
    <main className="page-content register-page">
      <div className="register-container">
        <h2>Регистрация в системе</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister} className="register-form">
          {/* Группа: Основные данные */}
          <div className="form-row">
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
              <label>Телефон</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+48 000 000 000"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Марка и модель авто (необязательно)</label>
            <input
              type="text"
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="Например: Toyota Prius+"
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

          {/* Группа: Пароли */}
          <div className="form-row">
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
              <label>Повторите пароль</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Еще раз"
                required
              />
            </div>
          </div>

          <button type="submit" className="register-submit-btn">
            Создать аккаунт
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