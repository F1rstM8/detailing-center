import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
// Если у тебя есть экшен для выхода (logout) в authSlice, импортируем его:
// import { logout } from "../../redux/authSlice"; 
import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  // Достаем данные пользователя (если он не залогинен, покажем заглушку)
  const { user } = useSelector((state) => state.auth);
  
  // Достаем все заказы и фильтруем только те, что принадлежат этому пользователю
  // Для простоты сверяем по номеру телефона (или имени)
  const allOrders = useSelector((state) => state.orders?.ordersList || []);
  const myOrders = allOrders.filter(
    (order) => order.customerPhone === (user?.phone || "+48 ")
  );

  // Временные данные профиля, если пользователь не авторизован (для наглядности)
  const currentUser = user || {
    name: "Гость",
    phone: "+48 000 000 000",
    email: "guest@example.com",
    car: "Не указан"
  };

  const handleLogout = () => {
    // dispatch(logout());
    alert("Здесь будет выход из аккаунта");
  };

  return (
    <main className="page-content profile-page">
      <div className="profile-container">
        
        <header className="profile-header">
          <h2>{t("profile_title", "Личный кабинет")}</h2>
        </header>

        <div className="profile-content">
          {/* Левая колонка: Данные пользователя */}
          <aside className="profile-sidebar">
            <div className="user-info-card">
              <div className="user-avatar">
                {currentUser.name.charAt(0)}
              </div>
              <h3>{currentUser.name}</h3>
              <p className="user-phone">{currentUser.phone}</p>
              
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Автомобиль:</span>
                  <span className="value">{currentUser.car}</span>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </aside>

          {/* Правая колонка: История заказов */}
          <section className="profile-orders">
            <h3>Мои заявки и автомобили</h3>
            
            {myOrders.length === 0 ? (
              <div className="no-orders">
                <p>У вас пока нет активных заявок.</p>
              </div>
            ) : (
              <div className="orders-list">
                {myOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-date">От {order.date}</span>
                      {/* Цвет бейджа зависит от статуса */}
                      <span className={`status-badge ${order.status === 'Новый' ? 'status-new' : 'status-progress'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-services">
                      <ul>
                        {order.items.map(item => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-footer">
                      <span className="order-total">Итого: {order.totalPrice} PLN</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

      </div>
    </main>
  );
};

export default Profile;