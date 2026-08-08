import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Настройка Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Правила валидации через Yup
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .required("Обязательное поле"),
    }),
    // Что делать при успешной отправке (когда нет ошибок валидации)
    onSubmit: (values) => {
      dispatch(login({ email: values.email }));
      navigate("/profile"); // Перенаправляем в личный кабинет
    },
  });

  return (
    <main className="page-content">
      <div className="form-container">
        <h2>Вход в личный кабинет</h2>
        
        {/* Передаем обработчик Formik в форму */}
        <form onSubmit={formik.handleSubmit} className="auth-form">
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@test.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Отслеживает, кликнул ли пользователь мимо поля
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? "input-error" : ""}
            />
            {/* Вывод ошибки валидации */}
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Введите пароль"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? "input-error" : ""}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit" className="submit-btn">Войти</button>
        </form>
      </div>
    </main>
  );
};

export default Login;