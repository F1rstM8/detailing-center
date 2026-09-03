import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "../../redux/authSlice";
import { useTranslation } from "react-i18next";
import { getLoginSchema } from "../../utils/validationSchemas"; 
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: getLoginSchema(t), 
    onSubmit: (values) => {
      const email = values.email;
      const storedUsers = JSON.parse(localStorage.getItem("appUsers")) || {};
      
      let finalName = "";
      let finalPhone = "";

      // Проверяем, есть ли пользователь в нашей локальной "базе"
      if (storedUsers[email]) {
        finalName = storedUsers[email].name;
        finalPhone = storedUsers[email].phone;
      } else {
        finalName = email.split("@")[0];
        finalPhone = t("mock_phone", "Телефон не указан");
      }

      // Жесткая проверка на администратора
      let finalId = Date.now().toString();
      if (email === "admin@test.com") {
        finalId = "1";
        finalName = "Администратор";
        finalPhone = "+48 000 000 000";
      }

      const userData = {
        id: finalId,
        email,
        name: finalName,
        phone: finalPhone,
        car: t("mock_car_status", "Не указан"),
      };

      dispatch(login(userData));
      navigate("/profile");
    },
  });

  return (
    <main className="page-content">
      <div className="form-container">
        <h2>{t("auth_login_title", "Вход в личный кабинет")}</h2>

        <form onSubmit={formik.handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t("auth_email", "Email")}</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@test.com"
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
              placeholder="••••••"
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

          <button type="submit" className="submit-btn">
            {t("auth_submit_login", "Войти")}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;