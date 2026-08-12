import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice"; 
import { removeOrder } from "../../redux/ordersSlice"; // Импортируем наш новый экшен
import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.auth);
  const allOrders = useSelector((state) => state.orders?.ordersList || []);

  const currentUser = {
    name: user?.name || "Гость",
    phone: user?.phone || "+48 000 000 000",
    email: user?.email || "guest@example.com",
    car: user?.car || "Не указан"
  };

  // Проверяем, является ли текущий пользователь админом
  const isAdmin = currentUser.email === "admin@test.com";

  // Если админ - показываем все заказы, если нет - только его собственные
  const displayedOrders = isAdmin 
    ? allOrders 
    : allOrders.filter((order) => order.customerPhone === currentUser.phone);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Вы уверены, что хотите безвозвратно удалить этот заказ?")) {
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
              <div className="user-avatar" style={isAdmin ? { background: "linear-gradient(135deg, #ff9800, #f57c00)", boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)" } : {}}>
                {isAdmin ? "А" : currentUser.name.charAt(0)}
              </div>
              <h3>{isAdmin ? "Администратор" : currentUser.name}</h3>
              <p className="user-phone">{currentUser.phone}</p>
              
              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
                {!isAdmin && (
                  <div className="detail-item">
                    <span className="label">Автомобиль:</span>
                    <span className="value">{currentUser.car}</span>
                  </div>
                )}
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </aside>

          <section className="profile-orders">
            <h3>{isAdmin ? "Все заявки (Панель управления)" : "Мои заявки и автомобили"}</h3>
            
            {displayedOrders.length === 0 ? (
              <div className="no-orders">
                <p>{isAdmin ? "В системе пока нет заказов." : "У вас пока нет активных заявок."}</p>
              </div>
            ) : (
              <div className="orders-list">
                {displayedOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-meta">
                        <span className="order-date">От {order.date}</span>
                        {/* Админ видит, чей это заказ */}
                        {isAdmin && (
                          <span className="order-customer">👤 {order.customerName} ({order.customerPhone})</span>
                        )}
                      </div>
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
                      
                      {/* Кнопка удаления доступна только админу */}
                      {isAdmin && (
                        <button 
                          className="delete-order-btn"
                          onClick={() => handleDeleteOrder(order.id)}
                        >
                          Удалить заказ
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