import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice";
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

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
    
    alert("Заявка успешно оформлена! Можете проверить её в Панели управления.");
  };

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
              <button className="checkout-btn" onClick={handleCheckout}>
                Оформить заказ
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>Ваша корзина пуста</h3>
            <p>Вы еще не выбрали ни одной услуги для своего автомобиля.</p>
            <Link to="/portfolio" className="btn-primary">
              Вернуться к услугам
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;