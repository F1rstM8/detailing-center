import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { useTranslation } from 'react-i18next'; // 1. Импортируем хук
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 2. Достаем функцию перевода и текущий язык
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleCheckout = () => {
    dispatch(clearCart());
    setIsOrderPlaced(true);
  };

  if (isOrderPlaced) {
    return (
      <main className="page-content cart-page">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ color: "#4caf50", marginBottom: "20px" }}>
            {t('cart_success_title')}
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#e0e0e0" }}>
            {t('cart_success_desc')}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content cart-page">
      <h1 className="cart-page__title">{t('cart_title')}</h1>

      {items.length === 0 ? (
        <p className="cart-page__empty">
          {t('cart_empty')}
        </p>
      ) : (
        <div className="cart-page__container">
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item__info">
                {/* 3. Вытаскиваем название в зависимости от выбранного языка */}
                <h3>{item.title[currentLang]}</h3>
                <p>{item.price} €</p>
              </div>

              <button
                className="cart-item__delete-btn"
                onClick={() => dispatch(removeItem(item.id))}
              >
                {t('cart_remove')}
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>
              {t('cart_total')}: <span>{totalPrice} €</span>
            </h2>
            <button
              className="cart-summary__checkout-btn"
              onClick={handleCheckout}
            >
              {t('cart_checkout')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;