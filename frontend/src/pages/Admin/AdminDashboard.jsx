import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus } from "../../redux/ordersSlice";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  // Получаем реальные заявки из глобального хранилища Redux
  const requests = useSelector((state) => state.orders.list);
  const dispatch = useDispatch();

  // Функция для смены статуса заявки через Redux
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <main className="page-content admin-page">
      <div className="admin-container">
        
        {/* Боковое меню */}
        <aside className="admin-sidebar">
          <h2>Управление</h2>
          <nav className="admin-nav">
            <button 
              className={activeTab === "requests" ? "active" : ""} 
              onClick={() => setActiveTab("requests")}
            >
              📋 Новые заявки
            </button>
            <button 
              className={activeTab === "clients" ? "active" : ""} 
              onClick={() => setActiveTab("clients")}
            >
              👥 Клиенты
            </button>
            <button 
              className={activeTab === "settings" ? "active" : ""} 
              onClick={() => setActiveTab("settings")}
            >
              ⚙️ Настройки услуг
            </button>
          </nav>
        </aside>

        {/* Основная рабочая область */}
        <section className="admin-content">
          <header className="admin-header">
            <h3>
              {activeTab === "requests" && "Управление заявками"}
              {activeTab === "clients" && "База клиентов"}
              {activeTab === "settings" && "Настройки прайс-листа"}
            </h3>
          </header>

          <div className="admin-workspace">
            
            {/* ВКЛАДКА: ЗАЯВКИ */}
            {activeTab === "requests" && (
              <div className="requests-list">
                {!requests || requests.length === 0 ? (
                  <p className="empty-message">Нет активных заявок.</p>
                ) : (
                  requests.map((req) => (
                    <div key={req.id} className="request-card">
                      <div className="req-info">
                        <h4>{req.service}</h4>
                        <p className="req-client">
                          <strong>Клиент:</strong> {req.client} ({req.phone})
                        </p>
                        <p className="req-car">
                          <strong>Авто:</strong> {req.car}
                        </p>
                        <p className="req-date">
                          <strong>Дата:</strong> {req.date}
                        </p>
                      </div>
                      
                      <div className="req-actions">
                        <span className={`status-badge ${req.status}`}>
                          {req.status === "pending" && "Ожидает"}
                          {req.status === "in_progress" && "В работе"}
                          {req.status === "completed" && "Выполнено"}
                        </span>
                        
                        <div className="action-buttons">
                          {req.status === "pending" && (
                            <button onClick={() => handleStatusChange(req.id, "in_progress")} className="btn-progress">
                              Взять в работу
                            </button>
                          )}
                          {req.status === "in_progress" && (
                            <button onClick={() => handleStatusChange(req.id, "completed")} className="btn-complete">
                              Завершить
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Заглушки для остальных вкладок */}
            {activeTab === "clients" && (
              <div className="placeholder-block">
                <p>Здесь будет список всех зарегистрированных пользователей и история их посещений.</p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="placeholder-block">
                <p>Здесь можно будет добавлять новые услуги, менять цены и загружать фото для портфолио.</p>
              </div>
            )}

          </div>
        </section>

      </div>
    </main>
  );
};

export default AdminDashboard;