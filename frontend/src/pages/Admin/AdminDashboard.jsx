import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, removeOrder } from "../../redux/ordersSlice";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const orders = useSelector((state) => state.orders.ordersList);
  const dispatch = useDispatch();

  const stats = useMemo(() => {
    if (!orders) return { totalOrders: 0, totalRevenue: 0, completedOrders: 0, newOrders: 0, inProgressOrders: 0, popularServices: [], maxServiceCount: 0 };

    const totalOrders = orders.length;
    
    const totalRevenue = orders
      .filter((o) => o.status === "Выполнено")
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    
    const completedOrders = orders.filter((o) => o.status === "Выполнено").length;
    const newOrders = orders.filter((o) => o.status === "Новый").length;
    const inProgressOrders = orders.filter((o) => o.status === "В работе").length; 

    // Подсчет популярности услуг
    const serviceCounts = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        serviceCounts[item.title] = (serviceCounts[item.title] || 0) + 1;
      });
    });

    const popularServices = Object.entries(serviceCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count);

    // Высчитываем максимальное значение для отрисовки 100% ширины на графике
    const maxServiceCount = popularServices.length > 0 ? Math.max(...popularServices.map(s => s.count)) : 0;

    return { totalOrders, totalRevenue, completedOrders, newOrders, inProgressOrders, popularServices, maxServiceCount };
  }, [orders]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  const handleDeleteOrder = (id) => {
    dispatch(removeOrder(id));
  };

  return (
    <main className="page-content admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h2>Панель управления</h2>
          <p>Управление заявками и статусами автомобилей</p>
        </header>

        <div className="admin-content">
          
          <section className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value revenue">{stats.totalRevenue} PLN</div>
              <div className="stat-label">Выручка</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📥</div>
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">Всего</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value text-new">{stats.newOrders}</div>
              <div className="stat-label">Новых</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-value text-progress">{stats.inProgressOrders}</div>
              <div className="stat-label">В работе</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value text-done">{stats.completedOrders}</div>
              <div className="stat-label">Готово</div>
            </div>
          </section>

          {/* НОВЫЙ БЛОК: Горизонтальная диаграмма популярности */}
          {stats.popularServices.length > 0 && (
            <section className="admin-popularity">
              <h3>График востребованности услуг</h3>
              <div className="popularity-chart">
                {stats.popularServices.map((service, index) => {
                  // Считаем ширину полосы в процентах
                  const percentage = Math.round((service.count / stats.maxServiceCount) * 100);

                  return (
                    <div key={index} className="chart-row">
                      <div className="chart-label">{service.title}</div>
                      <div className="chart-bar-container">
                        <div 
                          className="chart-bar" 
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="chart-value">{service.count}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <h3>Текущие заявки</h3>

          {!orders || orders.length === 0 ? (
            <p className="no-orders">Новых заявок пока нет.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-date">{order.date}</span>
                    <span
                      className={`order-status status-${order.status === "Новый" ? "new" : "progress"}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="order-body">
                    <p>
                      <strong>Клиент:</strong> {order.customerName}
                    </p>
                    <p>
                      <strong>Телефон:</strong> {order.customerPhone}
                    </p>
                    <div className="order-services">
                      <strong>Выбранные услуги:</strong>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.title} — {item.price} PLN
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="order-total">
                      <strong>Итого к оплате:</strong> {order.totalPrice} PLN
                    </p>
                  </div>

                  <div className="order-actions">
                    <button
                      className="btn-progress"
                      onClick={() => handleStatusChange(order.id, "В работе")}
                    >
                      В работу
                    </button>
                    <button
                      className="btn-done"
                      onClick={() => handleStatusChange(order.id, "Выполнено")}
                    >
                      Выполнено
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;