import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Добавили useNavigate
import { useTranslation } from "react-i18next";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice"; // Импорт экшена заявок
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Достаем данные клиента
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // НОВАЯ ФУНКЦИЯ: Оформление заказа
  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Пожалуйста, войдите в аккаунт или зарегистрируйтесь для оформления заказа.");
      navigate("/login");
      return;
    }

    // Собираем объект заявки
    const newOrder = {
      id: Date.now(),
      client: user?.name || "Клиент",
      phone: user?.phone || "Не указан",
      car: user?.car || "Не указано",
      // Склеиваем названия всех услуг через плюсик
      service: items.map(item => item.title).join(" + "), 
      total: totalPrice,
      date: new Date().toLocaleString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };

    dispatch(addOrder(newOrder)); // Отправляем в базу админа
    dispatch(clearCart()); // Очищаем корзину
    alert("Заявка успешно оформлена! Мы свяжемся с вами в ближайшее время.");
    navigate("/profile"); // Перекидываем в личный кабинет
  };

  return (
    <main className="page-content cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <h2>{t("cart_title", "Ваша корзина")}</h2>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>{t("cart_empty", "Ваша корзина пока пуста.")}</p>
            <Link to="/" className="back-to-shop">
              {t("cart_choose_services", "Выбрать услуги")}
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* ... (здесь остается вывод карточек услуг, как было раньше) ... */}
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="item-price">
                    <span>{item.price} PLN</span>
                    <button onClick={() => dispatch(removeItem(item.id))} className="remove-btn">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>{t("cart_total", "Итого к оплате:")}</span>
                <span className="total-price">{totalPrice} PLN</span>
              </div>
              
              {/* ВЕШАЕМ ФУНКЦИЮ НА КНОПКУ */}
              <button className="checkout-btn" onClick={handleCheckout}>
                {t("cart_checkout", "Оформить заявку")}
              </button>
              
              <button className="clear-btn" onClick={() => dispatch(clearCart())}>
                {t("cart_clear", "Очистить корзину")}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;