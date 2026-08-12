import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, removeOrder } from "../../redux/ordersSlice";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const orders = useSelector((state) => state.orders.ordersList);
  const dispatch = useDispatch();

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  // Убрали браузерный alert, теперь удаление происходит мгновенно
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