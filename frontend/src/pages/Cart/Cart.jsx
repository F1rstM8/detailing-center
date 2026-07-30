import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeItem, clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/ordersSlice"; 
import "./Cart.scss";

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isCheckoutFormOpen, setIsCheckoutFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "+48 ");

  const handleOrderSubmit = (e) => {
    if (e) e.preventDefault();

    // Проверка, чтобы клиент не отправил пустые поля
    if (!name.trim() || !phone.trim() || phone.trim() === "+48") {
      alert("Пожалуйста, введите корректное имя и номер телефона.");
      return;
    }

    const newOrder = {
      id: Date.now(), 
      date: new Date().toLocaleDateString("ru-RU"),
      customerName: name,
      customerPhone: phone,
      items: items,
      totalPrice: totalPrice,
      status: "Новый", 
    };

    try {
      dispatch(addOrder(newOrder)); 
      dispatch(clearCart()); 
      setIsSuccess(true); 
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      alert("Ошибка! Убедитесь, что ordersSlice подключен в store.js");
    }
  };

  if (isSuccess) {
    return (
      <main className="page-content cart-page">
        <div className="cart-container success-container">
          <h2>🎉 {t("order_success_title", "Заявка успешно отправлена!")}</h2>
          <p>{t("order_success_text", "Наш менеджер свяжется с вами в ближайшее время для подтверждения деталей.")}</p>
          <Link to="/" className="back-to-shop" onClick={() => setIsSuccess(false)}>
            {t("back_to_home", "Вернуться на главную")}
          </Link>
        </div>
      </main>
    );
  }

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
            {!isCheckoutFormOpen ? (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <h4>{item.title}</h4>
                      </div>
                      <div className="item-price">
                        <span>{item.price} PLN</span>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          className="remove-btn"
                          title={t("cart_remove", "Удалить")}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="summary-row">
                    <span>{t("cart_total", "Итого к оплате:")}</span>
                    <span className="total-price">{totalPrice} PLN</span>
                  </div>
                  <button 
                    className="checkout-btn"
                    onClick={() => setIsCheckoutFormOpen(true)}
                  >
                    {t("cart_checkout", "Оформить заявку")}
                  </button>
                  <button className="clear-btn" onClick={() => dispatch(clearCart())}>
                    {t("cart_clear", "Очистить корзину")}
                  </button>
                </div>
              </>
            ) : (
              <div className="checkout-form-container">
                <h3>{t("checkout_details", "Контактные данные")}</h3>
                {/* Теперь это div, а не form */}
                <div className="checkout-form">
                  <div className="input-group">
                    <label>Имя</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Как к вам обращаться?" 
                    />
                  </div>
                  <div className="input-group">
                    <label>Телефон</label>
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="checkout-actions">
                    {/* Кнопка с явным вызовом функции */}
                    <button 
                      type="button" 
                      className="checkout-btn"
                      onClick={handleOrderSubmit}
                    >
                      {t("confirm_order", "Подтвердить заказ")}
                    </button>
                    <button 
                      type="button" 
                      className="cancel-btn" 
                      onClick={() => setIsCheckoutFormOpen(false)}
                    >
                      {t("cancel", "Назад")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;