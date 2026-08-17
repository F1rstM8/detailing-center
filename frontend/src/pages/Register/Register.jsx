import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, t("val_name_min", "Имя слишком короткое"))
        .max(50, t("val_name_max", "Имя слишком длинное"))
        .required(t("val_required", "Обязательное поле")),
      email: Yup.string()
        .email(t("val_email", "Неверный формат email"))
        .required(t("val_required", "Обязательное поле")),
      password: Yup.string()
        .min(6, t("val_pass_min", "Пароль должен содержать минимум 6 символов"))
        .required(t("val_required", "Обязательное поле")),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          t("val_pass_match", "Пароли должны совпадать"),
        )
        .required(t("val_required", "Обязательное поле")),
    }),
    onSubmit: (values) => {
      console.log("Данные регистрации:", values);
      alert(
        t(
          "auth_register_success",
          "Регистрация успешна! Теперь вы можете войти.",
        ),
      );
      navigate("/login");
    },
  });

  return (
    <main className="page-content">
      <div className="form-container">
        <h2>{t("auth_register_title", "Регистрация")}</h2>

        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">{t("auth_name", "Имя")}</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={
                formik.touched.name && formik.errors.name ? "input-error" : ""
              }
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t("auth_email", "Email")}</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("auth_password", "Пароль")}</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.touched.password && formik.errors.password
                  ? "input-error"
                  : ""
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              {t("auth_password_confirm", "Повторите пароль")}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "input-error"
                  : ""
              }
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-message">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button type="submit" className="submit-btn">
            {t("auth_submit_register", "Зарегистрироваться")}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
