import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../redux/authSlice";
import "./Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Эмулируем регистрацию: сразу логиним пользователя с введенными данными
    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      car: formData.car,
    };

    // Передаем данные в Redux (роль - обычный клиент)
    dispatch(login({ user: newUser, role: "client" }));
    
    // Перенаправляем в Личный кабинет
    navigate("/profile");
  };

  return (
    <main className="page-content register-page">
      <div className="register-container">
        <div className="register-box">
          <h2>Создать аккаунт</h2>
          <p className="subtitle">Присоединяйтесь к нам для быстрого оформления заявок</p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-group">
              <label htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Например, Максим"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+48 000 000 000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="car">Ваш автомобиль</label>
                <input
                  type="text"
                  id="car"
                  name="car"
                  placeholder="Марка и модель"
                  value={formData.car}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="submit-btn">Зарегистрироваться</button>
          </form>

          <div className="register-footer">
            <span>Уже есть аккаунт?</span>
            <Link to="/login" className="login-link">Войти</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;