import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../../redux/cartSlice"; // Импортируем clearCart
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Локальное состояние для отслеживания успешного заказа
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Функция оформления заказа
  const handleCheckout = () => {
    // В будущем здесь будет код отправки данных на сервер (Node.js)

    dispatch(clearCart()); // Очищаем корзину в Redux
    setIsOrderPlaced(true); // Показываем сообщение об успехе
  };

  // Если заказ только что оформлен, показываем это сообщение
  if (isOrderPlaced) {
    return (
      <main className="page-content cart-page">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ color: "#4caf50", marginBottom: "20px" }}>
            🎉 Заявка успешно отправлена!
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#e0e0e0" }}>
            Наш менеджер скоро свяжется с вами для уточнения деталей времени
            записи.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content cart-page">
      <h1 className="cart-page__title">Ваша корзина</h1>

      {items.length === 0 ? (
        <p className="cart-page__empty">
          Корзина пока пуста. Перейдите на главную страницу, чтобы выбрать
          услуги.
        </p>
      ) : (
        <div className="cart-page__container">
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item__info">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>

              <button
                className="cart-item__delete-btn"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Удалить
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>
              Итого к оплате: <span>{totalPrice} €</span>
            </h2>
            {/* Вешаем функцию на кнопку */}
            <button
              className="cart-summary__checkout-btn"
              onClick={handleCheckout}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
