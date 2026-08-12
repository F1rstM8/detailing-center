import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice";
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  // Достаем данные пользователя (если он не авторизован, тут будет null)
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Имя должно содержать минимум 2 символа")
      .required("Поле обязательно для заполнения"),
    phone: Yup.string()
      .matches(/^[+0-9() -]{9,15}$/, "Введите корректный номер телефона")
      .required("Телефон обязателен для связи"),
    comment: Yup.string().max(200, "Комментарий не должен превышать 200 символов"),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      comment: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsProcessing(true);

      setTimeout(() => {
        const newOrder = {
          id: `ord-${Date.now()}`,
          date: new Date().toLocaleDateString("ru-RU"),
          customerName: values.name,
          customerPhone: values.phone,
          comment: values.comment,
          status: "Новый",
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
            <h2>Заявка успешно оформлена!</h2>
            <p>Мы свяжемся с вами в ближайшее время. Ваша заявка сохранена в профиле.</p>
            <div className="success-actions">
              <Link to="/profile" className="btn-primary" onClick={() => setIsSuccess(false)}>
                Перейти в профиль
              </Link>
              <Link to="/services" className="btn-secondary" onClick={() => setIsSuccess(false)}>
                Вернуться к услугам
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
        <h2>Ваша заявка</h2>

        {items && items.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h3>{item.title}</h3>
                    <p className="item-category">{item.category}</p>
                  </div>
                  <div className="item-actions">
                    <span className="item-price">{item.price} PLN</span>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Оформление</h3>
              
              <div className="summary-row">
                <span>Количество услуг:</span>
                <span>{items.length} шт.</span>
              </div>
              <div className="summary-row total">
                <span>К оплате:</span>
                <span>{totalPrice} PLN</span>
              </div>

              {/* УСЛОВНЫЙ РЕНДЕР: Если пользователя нет, просим войти. Если есть - показываем форму */}
              {!user ? (
                <div className="auth-required-message">
                  <p>Оформление заказа доступно только зарегистрированным пользователям.</p>
                  {/* Замените "/login" на ваш путь к странице авторизации, если он другой */}
                  <Link to="/login" className="btn-primary login-link">
                    Войти в аккаунт
                  </Link>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} className="checkout-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.name && formik.errors.name ? "input-error" : ""}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <span className="error-text">{formik.errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+48 000 000 000"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={formik.touched.phone && formik.errors.phone ? "input-error" : ""}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <span className="error-text">{formik.errors.phone}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      name="comment"
                      placeholder="Марка авто или пожелания..."
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows="2"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className={`checkout-btn ${isProcessing ? "processing" : ""}`} 
                    disabled={isProcessing}
                  >
                    {isProcessing ? "" : "Оформить заказ"}
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>Ваша корзина пуста</h3>
            <p>Вы еще не выбрали ни одной услуги для своего автомобиля.</p>
            <Link to="/services" className="btn-primary">
              Вернуться к услугам
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;