import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import "./Profile.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  // Достаем все заявки из Redux
  const { list: orders } = useSelector((state) => state.orders); 
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Фильтруем заявки: показываем только те, которые принадлежат текущему пользователю
  const userOrders = orders.filter(
    (order) => order.client === user?.name && order.phone === user?.phone
  );

  return (
    <main className="page-content profile-page">
      <div className="profile-container">
        
        <header className="profile-header">
          <h2>Личный кабинет</h2>
          <button onClick={handleLogout} className="logout-btn">
            Выйти из аккаунта
          </button>
        </header>

        <div className="profile-content">
          {/* Блок с личными данными */}
          <section className="profile-card user-info">
            <h3>Мои данные</h3>
            <div className="info-list">
              <div className="info-item">
                <span className="label">Имя:</span>
                <span className="value">{user?.name || "Не указано"}</span>
              </div>
              <div className="info-item">
                <span className="label">Телефон:</span>
                <span className="value">{user?.phone || "Не указано"}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{user?.email || "Не указано"}</span>
              </div>
              <div className="info-item">
                <span className="label">Автомобиль:</span>
                <span className="value">{user?.car || "Не добавлен"}</span>
              </div>
            </div>
            <button className="edit-btn">Редактировать профиль</button>
          </section>

          {/* Блок с историей записей */}
          <section className="profile-card user-appointments">
            <h3>Мои записи</h3>
            
            <div className="appointment-list">
              {userOrders.length === 0 ? (
                <p style={{ color: "#a0a0a0", textAlign: "center", padding: "20px 0" }}>
                  У вас пока нет активных записей.
                </p>
              ) : (
                userOrders.map((order) => (
                  <div key={order.id} className="appointment-item">
                    <div className="appointment-details">
                      <h4>{order.service}</h4>
                      <p className="appointment-date">{order.date}</p>
                      <p className="appointment-price" style={{ color: "#a0a0a0", fontSize: "13px", marginTop: "4px" }}>
                        Сумма: {order.total} PLN
                      </p>
                    </div>
                    {/* Класс статуса динамически подставляется из данных */}
                    <div className={`appointment-status ${order.status}`}>
                      {order.status === "pending" && "Ожидает"}
                      {order.status === "in_progress" && "В работе"}
                      {order.status === "completed" && "Выполнено"}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button className="new-appointment-btn" onClick={() => navigate("/#services")}>
              Записаться на услуги
            </button>
          </section>
        </div>

      </div>
    </main>
  );
};

export default Profile;