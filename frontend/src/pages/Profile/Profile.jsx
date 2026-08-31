import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice"; 
import { removeOrder } from "../../redux/ordersSlice";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "../../constants/statuses";
import { CURRENCY } from "../../constants/config";
import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const allOrders = useSelector((state) => state.orders?.ordersList || []);

  // Используем наш новый подход к переводу статусов
  const statusLabels = useMemo(() => ({
    [ORDER_STATUS.NEW]: t("status_new", "Новый"),
    [ORDER_STATUS.IN_PROGRESS]: t("status_progress", "В работе"),
    [ORDER_STATUS.COMPLETED]: t("status_done", "Выполнено"),
  }), [t]);

  const currentUser = {
    name: user?.name || t("profile_guest", "Гость"),
    phone: user?.phone || "+48 000 000 000",
    email: user?.email || "guest@example.com",
    car: user?.car || t("mock_car_status", "Не указан")
  };

  const displayName = (currentUser.name === "Постоянный клиент" || currentUser.name === "Stały klient")
    ? t("mock_client_name", "Постоянный клиент")
    : currentUser.name;
    
  const displayCar = (currentUser.car === "Не указан" || currentUser.car === "Nie podano")
    ? t("mock_car_status", "Не указан")
    : currentUser.car;

  const isAdmin = user?.role === "admin" || currentUser.email === "admin@test.com";

  // ИСПРАВЛЕНО: Теперь ищем заказы строго по уникальному ID пользователя
  const displayedOrders = isAdmin 
    ? allOrders 
    : allOrders.filter((order) => order.userId === user?.id);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(t("profile_delete_confirm", "Вы уверены, что хотите безвозвратно удалить этот заказ?"))) {
      dispatch(removeOrder(orderId));
    }
  };

  return (
    <main className="page-content profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <h2>{t("profile_title", "Личный кабинет")}</h2>
        </header>

        <div className="profile-content">
          <aside className="profile-sidebar">
            <div className="user-info-card">
             
              <div className={`user-avatar ${isAdmin ? 'admin-avatar' : ''}`}>
                {isAdmin ? "А" : displayName.charAt(0)}
              </div>
              
              <h3>{isAdmin ? t("profile_admin", "Администратор") : displayName}</h3>
              <p className="user-phone">{currentUser.phone}</p>
              
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
                {!isAdmin && (
                  <div className="detail-item">
                    <span className="label">{t("profile_car", "Автомобиль:")}</span>
                    <span className="value">{displayCar}</span>
                  </div>
                )}
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                {t("btn_logout", "Выйти")}
              </button>
            </div>
          </aside>

          <section className="profile-orders">
            <h3>{isAdmin ? t("profile_all_orders", "Все заявки (Панель управления)") : t("profile_my_orders", "Мои заявки и автомобили")}</h3>
            
            {displayedOrders.length === 0 ? (
              <div className="no-orders">
                <p>{isAdmin ? t("profile_no_orders_admin", "В системе пока нет заказов.") : t("profile_no_orders", "У вас пока нет активных заявок.")}</p>
              </div>
            ) : (
              <div className="orders-list">
                {displayedOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-meta">
                        <span className="order-date">{t("profile_order_from", "От")} {order.date}</span>
                        {isAdmin && (
                          <span className="order-customer">👤 {order.customerName} ({order.customerPhone})</span>
                        )}
                      </div>
                      
                      {/* ИСПРАВЛЕНО: Классы и тексты статусов через константы */}
                      <span className={`status-badge ${ORDER_STATUS_CLASSES[order.status] || ""}`}>
                        {statusLabels[order.status] || order.status}
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
                      {/* ИСПРАВЛЕНО: Валюта через константу */}
                      <span className="order-total">{t("profile_order_total", "Итого:")} {order.totalPrice} {CURRENCY}</span>
                      
                      {isAdmin && (
                        <button 
                          className="delete-order-btn"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          {t("btn_delete", "Удалить")}
                        </button>
                      )}
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