import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "./Profile.scss";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  
  const allOrders = useSelector((state) => state.orders?.ordersList || []);
  const myOrders = allOrders.filter(
    (order) => order.customerPhone === (user?.phone || "+48 ")
  );

  const currentUser = user || {
    name: "Гость",
    phone: "+48 000 000 000",
    email: "guest@example.com",
    car: "Не указан"
  };

  const handleLogout = () => {
    alert("Здесь будет выход из аккаунта");
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