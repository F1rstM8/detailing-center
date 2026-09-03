import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice";
import { useTranslation } from "react-i18next";
import { ORDER_STATUS } from "../../constants/statuses";
import { CURRENCY } from "../../constants/config";
import "./Cart.scss";


const FALLBACK_SERVICES = {
  "s1": { title_ru: "Комплексная химчистка салона", title_pl: "Kompleksowe czyszczenie wnętrza", category_ru: "Интерьер", category_pl: "Wnętrze" },
  "s2": { title_ru: "Полировка кузова (Восстановительная)", title_pl: "Polerowanie karoserii (Rewitalizujące)", category_ru: "Экстерьер", category_pl: "Nadwozie" },
  "s3": { title_ru: "Керамическое покрытие (2 слоя)", title_pl: "Powłoka ceramiczna (2 warstwy)", category_ru: "Защита", category_pl: "Ochrona" },
  "s4": { title_ru: "Оклейка зон риска полиуретаном", title_pl: "Oklejanie stref ryzyka folią PPF", category_ru: "Пленка", category_pl: "Folia" },
  "s5": { title_ru: "Мойка двигателя диэлектриком", title_pl: "Mycie silnika dielektrykiem", category_ru: "Детейлинг-мойка", category_pl: "Mycie detailingowe" }
};

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); 
  const allServices = useSelector((state) => state.services?.servicesList || []); 
  
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, t("val_name_min", "Имя должно содержать минимум 2 символа"))
      .required(t("val_required", "Обязательное поле")),
    phone: Yup.string()
      .matches(/^[+0-9() -]{9,15}$/, t("val_phone_format", "Введите корректный номер телефона"))
      .required(t("val_required", "Обязательное поле")),
    car: Yup.string()
      .max(50, t("val_car_max", "Название авто слишком длинное")),
    comment: Yup.string()
      .max(200, t("val_comment_max", "Комментарий не должен превышать 200 символов")),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      car: user?.cars && user.cars.length > 0 ? user.cars[0].model : "", 
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsProcessing(true);

      setTimeout(() => {
        const newOrder = {
          id: `ord-${Date.now()}`,
          userId: user?.id, 
          date: new Date().toLocaleDateString("ru-RU"),
          customerName: values.name,
          customerPhone: values.phone,
          customerCar: values.car || t("mock_car_status", "Не указан"), 
          comment: values.comment,
          status: ORDER_STATUS.NEW, 
          items: items,
          totalPrice: totalPrice,
        };

        dispatch(addOrder(newOrder));
        dispatch(clearCart());
        
        setIsProcessing(false);
        setIsSuccess(true);
      }, 1500);
    },
  });

  if (isSuccess) {
    return (
      <main className="page-content cart-page">
        <div className="cart-container">
          <div className="success-container">
            <div className="success-animation">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h2>{t("cart_success_title", "Заявка успешно оформлена!")}</h2>
            <p>{t("cart_success_desc", "Мы свяжемся с вами в ближайшее время. Ваша заявка сохранена в профиле.")}</p>
            <div className="success-actions">
              <Link to="/profile" className="btn-primary" onClick={() => setIsSuccess(false)}>
                {t("btn_to_profile", "Перейти в профиль")}
              </Link>
              <Link to="/services" className="btn-secondary" onClick={() => setIsSuccess(false)}>
                {t("btn_back_to_services", "Вернуться к услугам")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content cart-page">
      <div className="cart-container">
        <h2>{t("cart_page_title", "Ваша заявка")}</h2>

        {items && items.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item) => {
               
                const serviceInfo = allServices.find((s) => s.id === item.id) || FALLBACK_SERVICES[item.id];
                const currentLang = i18n.language?.startsWith("pl") ? "pl" : "ru";
                
                
                const title = serviceInfo 
                  ? (currentLang === "pl" ? serviceInfo.title_pl : serviceInfo.title_ru) 
                  : item.title;
                  
                const category = serviceInfo
                  ? (currentLang === "pl" ? serviceInfo.category_pl : serviceInfo.category_ru)
                  : item.category;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="item-info">
                      <h3>{title}</h3>
                      <p className="item-category">{category}</p>
                    </div>
                    <div className="item-actions">
                      <span className="item-price">{item.price} {CURRENCY}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={t("cart_remove_item", "Удалить услугу")}
                        title={t("cart_remove_item", "Удалить услугу")}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h3>{t("cart_checkout_title", "Оформление")}</h3>
              
              <div className="summary-row">
                <span>{t("cart_items_count", "Количество услуг:")}</span>
                <span>{items.length} {t("cart_pcs", "шт.")}</span>
              </div>
              <div className="summary-row total">
                <span>{t("cart_total_pay", "К оплате:")}</span>
                <span>{totalPrice} {CURRENCY}</span>
              </div>

              {!user ? (
                <div className="auth-required-message">
                  <p>{t("cart_auth_required", "Оформление заказа доступно только зарегистрированным пользователям.")}</p>
                  <Link to="/login" className="btn-primary login-link">
                    {t("cart_login_btn", "Войти в аккаунт")}
                  </Link>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} className="checkout-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="checkout-name" className="visually-hidden">
                      {t("auth_name", "Ваше имя")}
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      name="name"
                      placeholder={t("auth_name", "Ваше имя")}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.name && formik.errors.name ? "input-error" : ""}
                      aria-invalid={formik.touched.name && formik.errors.name ? "true" : "false"}
                      aria-describedby={formik.touched.name && formik.errors.name ? "name-error" : undefined}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <span id="name-error" className="error-text" aria-live="polite">
                        {formik.errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-phone" className="visually-hidden">
                      {t("auth_phone", "Телефон")}
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      placeholder="+48 000 000 000"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.phone && formik.errors.phone ? "input-error" : ""}
                      aria-invalid={formik.touched.phone && formik.errors.phone ? "true" : "false"}
                      aria-describedby={formik.touched.phone && formik.errors.phone ? "phone-error" : undefined}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <span id="phone-error" className="error-text" aria-live="polite">
                        {formik.errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-car" className="visually-hidden">
                      {t("profile_car", "Автомобиль")}
                    </label>
                    {user?.cars && user.cars.length > 0 ? (
                      <select
                        id="checkout-car"
                        name="car"
                        value={formik.values.car}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.car && formik.errors.car ? "input-error" : ""}
                        style={{ width: "100%", padding: "12px 15px", backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "inherit", outline: "none", fontSize: "1rem" }}
                      >
                        {user.cars.map((c) => (
                          <option key={c.id} value={c.model} style={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
                            {c.model}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id="checkout-car"
                        type="text"
                        name="car"
                        placeholder={t("cart_car_placeholder", "Марка вашего авто (например: Toyota Prius+)")}
                        value={formik.values.car}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={formik.touched.car && formik.errors.car ? "input-error" : ""}
                        aria-invalid={formik.touched.car && formik.errors.car ? "true" : "false"}
                        aria-describedby={formik.touched.car && formik.errors.car ? "car-error" : undefined}
                      />
                    )}
                    {formik.touched.car && formik.errors.car && (
                      <span id="car-error" className="error-text" aria-live="polite">
                        {formik.errors.car}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="checkout-comment" className="visually-hidden">
                      {t("cart_comment", "Комментарий")}
                    </label>
                    <textarea
                      id="checkout-comment"
                      name="comment"
                      placeholder={t("cart_comment_placeholder", "Дополнительные пожелания...")}
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows="2"
                      className={formik.touched.comment && formik.errors.comment ? "input-error" : ""}
                      aria-invalid={formik.touched.comment && formik.errors.comment ? "true" : "false"}
                      aria-describedby={formik.touched.comment && formik.errors.comment ? "comment-error" : undefined}
                    />
                    {formik.touched.comment && formik.errors.comment && (
                      <span id="comment-error" className="error-text" aria-live="polite">
                        {formik.errors.comment}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    className={`checkout-btn ${isProcessing ? "processing" : ""}`} 
                    disabled={isProcessing}
                  >
                    {isProcessing ? "" : t("cart_checkout", "Оформить заказ")}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>{t("cart_empty_title", "Ваша корзина пуста")}</h3>
            <p>{t("cart_empty", "Вы еще не выбрали ни одной услуги для своего автомобиля.")}</p>
            <Link to="/services" className="btn-primary">
              {t("btn_back_to_services", "Вернуться к услугам")}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;