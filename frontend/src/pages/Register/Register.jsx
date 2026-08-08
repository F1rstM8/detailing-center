import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Имя слишком короткое")
        .max(50, "Имя слишком длинное")
        .required("Обязательное поле"),
      email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Пароль должен содержать минимум 6 символов")
        .required("Обязательное поле"),
      confirmPassword: Yup.string()
        // Проверяем, что поле совпадает с полем password
        .oneOf([Yup.ref('password'), null], "Пароли должны совпадать")
        .required("Обязательное поле"),
    }),
    onSubmit: (values) => {
      // Здесь в будущем будет отправка данных на бекенд (Axios / Fetch)
      console.log("Данные регистрации:", values);
      alert("Регистрация успешна! Теперь вы можете войти.");
      navigate("/login");
    },
  });

  return (
    <main className="page-content">
      <div className="form-container">
        <h2>Регистрация</h2>
        
        <form onSubmit={formik.handleSubmit} className="auth-form">
          
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <button type="submit" className="submit-btn">Зарегистрироваться</button>
        </form>
      </div>
    </main>
  );
};

export default Register;