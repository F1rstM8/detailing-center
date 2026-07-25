import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartSlice';
import './Cart.scss'; // Подключаем стили

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <main className="page-content cart-page">
      <h1 className="cart-page__title">Ваша корзина</h1>

      {items.length === 0 ? (
        <p className="cart-page__empty">
          Корзина пока пуста. Перейдите на главную страницу, чтобы выбрать услуги.
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
            <h2>Итого к оплате: <span>{totalPrice} €</span></h2>
            <button className="cart-summary__checkout-btn">
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;