import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateOrderStatus, removeOrder } from "../../redux/ordersSlice";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "../../constants/statuses";
import { CURRENCY } from "../../constants/config";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const orders = useSelector((state) => state.orders.ordersList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const statusLabels = useMemo(
    () => ({
      [ORDER_STATUS.NEW]: t("status_new", "Новый"),
      [ORDER_STATUS.IN_PROGRESS]: t("status_in_progress", "В работе"),
      [ORDER_STATUS.COMPLETED]: t("status_completed", "Выполнено"),
    }),
    [t],
  );

  const stats = useMemo(() => {
    if (!orders)
      return {
        totalOrders: 0,
        totalRevenue: 0,
        completedOrders: 0,
        newOrders: 0,
        inProgressOrders: 0,
        popularServices: [],
        maxServiceCount: 0,
      };

    const totalOrders = orders.length;

    const totalRevenue = orders
      .filter((o) => o.status === ORDER_STATUS.COMPLETED)
      .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

    const completedOrders = orders.filter(
      (o) => o.status === ORDER_STATUS.COMPLETED,
    ).length;
    const newOrders = orders.filter(
      (o) => o.status === ORDER_STATUS.NEW,
    ).length;
    const inProgressOrders = orders.filter(
      (o) => o.status === ORDER_STATUS.IN_PROGRESS,
    ).length;

    const serviceCounts = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        serviceCounts[item.title] = (serviceCounts[item.title] || 0) + 1;
      });
    });

    const popularServices = Object.entries(serviceCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count);

    const maxServiceCount =
      popularServices.length > 0
        ? Math.max(...popularServices.map((s) => s.count))
        : 0;

    return {
      totalOrders,
      totalRevenue,
      completedOrders,
      newOrders,
      inProgressOrders,
      popularServices,
      maxServiceCount,
    };
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
          <h2>{t("admin_title", "Панель управления")}</h2>
          <p>
            {t("admin_subtitle", "Управление заявками и статусами автомобилей")}
          </p>
        </header>

        <div className="admin-content">
          <section className="admin-stats">
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-value revenue">
                {stats.totalRevenue} {CURRENCY}
              </div>
              <div className="stat-label">{t("stat_revenue", "Выручка")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📥</div>
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">{t("stat_total", "Всего")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value text-new">{stats.newOrders}</div>
              <div className="stat-label">{t("stat_new", "Новых")}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⚙️</div>
              <div className="stat-value text-progress">
                {stats.inProgressOrders}
              </div>
              <div className="stat-label">
                {t("stat_in_progress", "В работе")}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value text-done">
                {stats.completedOrders}
              </div>
              <div className="stat-label">{t("stat_completed", "Готово")}</div>
            </div>
          </section>

          {stats.popularServices.length > 0 && (
            <section className="admin-popularity">
              <h3>{t("admin_chart_title", "График востребованности услуг")}</h3>
              <div className="popularity-chart">
                {stats.popularServices.map((service) => {
                  const percentage = Math.round(
                    (service.count / stats.maxServiceCount) * 100,
                  );

                  return (
                    <div key={service.title} className="chart-row">
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

          <h3>{t("admin_current_orders", "Текущие заявки")}</h3>

          {!orders || orders.length === 0 ? (
            <p className="no-orders">
              {t("admin_no_orders", "Новых заявок пока нет.")}
            </p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-date">{order.date}</span>
                    <span
                      className={`order-status ${ORDER_STATUS_CLASSES[order.status] || ""}`}
                    >
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>

                  <div className="order-body">
                    <p>
                      <strong>{t("order_client", "Клиент:")}</strong>{" "}
                      {order.customerName}
                    </p>
                    <p>
                      <strong>{t("order_phone", "Телефон:")}</strong>{" "}
                      {order.customerPhone}
                    </p>
                    <div className="order-services">
                      <strong>
                        {t("order_services_selected", "Выбранные услуги:")}
                      </strong>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.title} — {item.price} {CURRENCY}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="order-total">
                      <strong>
                        {t("order_total_price", "Итого к оплате:")}
                      </strong>{" "}
                      {order.totalPrice} {CURRENCY}
                    </p>
                  </div>

                  <div className="order-actions">
                    {order.status !== ORDER_STATUS.IN_PROGRESS && (
                      <button
                        className="btn-progress"
                        onClick={() =>
                          handleStatusChange(order.id, ORDER_STATUS.IN_PROGRESS)
                        }
                      >
                        {t("btn_in_progress", "В работу")}
                      </button>
                    )}
                    {order.status !== ORDER_STATUS.COMPLETED && (
                      <button
                        className="btn-done"
                        onClick={() =>
                          handleStatusChange(order.id, ORDER_STATUS.COMPLETED)
                        }
                      >
                        {t("btn_completed", "Выполнено")}
                      </button>
                    )}
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      {t("btn_delete", "Удалить")}
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
