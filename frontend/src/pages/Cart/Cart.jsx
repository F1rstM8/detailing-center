import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice";
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  // Новые стейты для анимаций
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Включаем анимацию загрузки на кнопке
    setIsProcessing(true);

    // Имитируем задержку отправки данных на сервер (1.5 секунды)
    setTimeout(() => {
      const newOrder = {
        id: `ord-${Date.now()}`,
        date: new Date().toLocaleDateString("ru-RU"),
        customerName: user?.name || "Гость",
        customerPhone: user?.phone || "Не указан",
        status: "Новый",
        items: items,
        totalPrice: totalPrice,
      };

      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      
      // Выключаем загрузку и показываем экран успеха
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  // Экран успешного оформления (рендерится, если isSuccess === true)
  if (isSuccess) {
    return (
      <main className="page-content cart-page">
        <div className="cart-container">
          <div className="success-container">
            <div className="success-animation">
              {/* SVG для анимированной галочки */}
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

  // Стандартный рендер корзины (если isSuccess === false)
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
              <h3>Итого</h3>
              <div className="summary-row">
                <span>Количество услуг:</span>
                <span>{items.length} шт.</span>
              </div>
              <div className="summary-row total">
                <span>К оплате:</span>
                <span>{totalPrice} PLN</span>
              </div>
              
              {/* Кнопка с динамическим классом для анимации загрузки */}
              <button 
                className={`checkout-btn ${isProcessing ? "processing" : ""}`} 
                onClick={handleCheckout}
                disabled={isProcessing} // Блокируем повторные клики
              >
                {isProcessing ? "" : "Оформить заказ"}
              </button>
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