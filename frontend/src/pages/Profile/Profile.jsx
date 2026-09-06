import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/authSlice";
import { removeOrder } from "../../redux/ordersSlice";
import { ORDER_STATUS, ORDER_STATUS_CLASSES } from "../../constants/statuses";
import { getLocalizedField } from "../../helpers/getLocalizedField";
import "./Profile.scss";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const allOrders = useSelector((state) => state.orders?.ordersList || []);

  const allServices = useSelector(
    (state) => state.services?.servicesList || [],
  );

  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCarModel, setNewCarModel] = useState("");

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    targetId: null,
  });

  const currentUser = {
    name: user?.name || t("profile_guest", "Гость"),
    phone: user?.phone || "+48 000 000 000",
    email: user?.email || "guest@example.com",
    cars: user?.cars || [],
  };

  const displayName =
    currentUser.name === "Постоянный клиент" ||
    currentUser.name === "Stały klient"
      ? t("mock_client_name", "Постоянный клиент")
      : currentUser.name;

const isAdmin = user?.role === "admin";

  const displayedOrders = isAdmin
    ? allOrders
    : allOrders.filter((order) => order.customerPhone === currentUser.phone);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const updateUserCars = (updatedCars) => {
    const updatedUser = { ...user, cars: updatedCars };
    const storedUsers = JSON.parse(localStorage.getItem("appUsers")) || {};

    if (storedUsers[user.email]) {
      storedUsers[user.email].cars = updatedCars;
      localStorage.setItem("appUsers", JSON.stringify(storedUsers));
    }
    dispatch(login(updatedUser));
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    if (!newCarModel.trim()) return;

    const newCar = { id: `car-${Date.now()}`, model: newCarModel.trim() };
    const updatedCars = [...currentUser.cars, newCar];

    updateUserCars(updatedCars);
    setNewCarModel("");
    setIsAddingCar(false);
  };

  const handleRemoveCarRequest = (carId) => {
    setConfirmModal({ isOpen: true, type: "car", targetId: carId });
  };

  const handleDeleteOrderRequest = (orderId) => {
    setConfirmModal({ isOpen: true, type: "order", targetId: orderId });
  };

  const confirmAction = () => {
    if (confirmModal.type === "car") {
      const updatedCars = currentUser.cars.filter(
        (car) => car.id !== confirmModal.targetId,
      );
      updateUserCars(updatedCars);
    } else if (confirmModal.type === "order") {
      dispatch(removeOrder(confirmModal.targetId));
    }
    setConfirmModal({ isOpen: false, type: null, targetId: null });
  };

  const cancelAction = () => {
    setConfirmModal({ isOpen: false, type: null, targetId: null });
  };

  const translateStatus = (status) => {
    switch (status) {
      case ORDER_STATUS.NEW:
        return t("status_new", "Новый");
      case ORDER_STATUS.IN_PROGRESS:
        return t("status_in_progress", "В работе");
      case ORDER_STATUS.COMPLETED:
        return t("status_completed", "Выполнено");
      default:
        return status;
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
              <div className={`user-avatar ${isAdmin ? "admin-avatar" : ""}`}>
                {isAdmin ? "А" : displayName.charAt(0).toUpperCase()}
              </div>

              <h3>
                {isAdmin ? t("profile_admin", "Администратор") : displayName}
              </h3>
              <p className="user-phone">{currentUser.phone}</p>

              <div className="user-details">
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{currentUser.email}</span>
                </div>
              </div>

              {!isAdmin && (
                <div className="user-garage">
                  <h4 className="garage-title">
                    {t("profile_garage", "Мой Гараж")}
                  </h4>

                  {currentUser.cars.length === 0 ? (
                    <p className="no-cars">
                      {t("profile_no_cars", "У вас пока нет добавленных авто")}
                    </p>
                  ) : (
                    <ul className="cars-list">
                      {currentUser.cars.map((car) => (
                        <li key={car.id} className="car-item">
                          <span className="car-model">🚗 {car.model}</span>
                          <button
                            className="remove-car-btn"
                            onClick={() => handleRemoveCarRequest(car.id)}
                            title={t("btn_remove_car", "Удалить авто")}
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {isAddingCar ? (
                    <form onSubmit={handleAddCar} className="add-car-form">
                      <input
                        type="text"
                        value={newCarModel}
                        onChange={(e) => setNewCarModel(e.target.value)}
                        placeholder={t(
                          "profile_car_placeholder",
                          "Например: Toyota Prius+",
                        )}
                        autoFocus
                      />
                      <div className="add-car-actions">
                        <button type="submit" className="btn-save">
                          {t("btn_save", "Сохранить")}
                        </button>
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => setIsAddingCar(false)}
                        >
                          {t("btn_cancel", "Отмена")}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      className="btn-add-car"
                      onClick={() => setIsAddingCar(true)}
                    >
                      + {t("btn_add_car", "Добавить авто")}
                    </button>
                  )}
                </div>
              )}

              <button className="logout-btn" onClick={handleLogout}>
                {t("btn_logout", "Выйти")}
              </button>
            </div>
          </aside>

          <section className="profile-orders">
            <h3>
              {isAdmin
                ? t("profile_all_orders", "Все заявки (Панель управления)")
                : t("profile_my_orders", "Мои заявки")}
            </h3>

            {displayedOrders.length === 0 ? (
              <div className="no-orders">
                <p>
                  {isAdmin
                    ? t(
                        "profile_no_orders_admin",
                        "В системе пока нет заказов.",
                      )
                    : t("profile_no_orders", "У вас пока нет активных заявок.")}
                </p>
              </div>
            ) : (
              <div className="orders-list">
                {displayedOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-meta">
                        <span className="order-date">
                          {t("profile_order_from", "От")} {order.date}
                        </span>

                        {order.customerCar &&
                          order.customerCar !==
                            t("mock_car_status", "Не указан") && (
                            <span
                              className="order-customer"
                              style={{
                                color: "#a0a0a0",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              🚗 {order.customerCar}
                            </span>
                          )}
                        {isAdmin && (
                          <span className="order-customer">
                            👤 {order.customerName} ({order.customerPhone})
                          </span>
                        )}
                      </div>
                      <span
                        className={`status-badge ${ORDER_STATUS_CLASSES[order.status] || "status-new"}`}
                      >
                        {translateStatus(order.status)}
                      </span>
                    </div>

                    <div className="order-services">
                      <ul>
                        {order.items.map((item) => {
                          const serviceInfo = allServices.find(
                            (s) => s.id === item.id,
                          );
                          const currentLang = i18n.language?.startsWith("pl")
                            ? "pl"
                            : "ru";

                          const title = serviceInfo
                            ? getLocalizedField(
                                serviceInfo,
                                "title",
                                currentLang,
                              )
                            : item.title;

                          return <li key={item.id}>{title}</li>;
                        })}
                      </ul>
                    </div>

                    <div className="order-footer">
                      <span className="order-total">
                        {t("profile_order_total", "Итого:")} {order.totalPrice}{" "}
                        PLN
                      </span>

                      {isAdmin && (
                        <button
                          className="delete-order-btn"
                          onClick={() => handleDeleteOrderRequest(order.id)}
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

      {confirmModal.isOpen && (
        <div className="custom-confirm-overlay" onClick={cancelAction}>
          <div
            className="custom-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{t("profile_confirm_title", "Подтверждение")}</h3>
            <p>
              {confirmModal.type === "car"
                ? t(
                    "profile_remove_car_confirm",
                    "Удалить автомобиль из гаража?",
                  )
                : t(
                    "profile_delete_order_confirm",
                    "Вы уверены, что хотите безвозвратно удалить этот заказ?",
                  )}
            </p>
            <div className="custom-confirm-actions">
              <button className="btn-cancel" onClick={cancelAction}>
                {t("btn_cancel", "Отмена")}
              </button>
              <button className="btn-delete" onClick={confirmAction}>
                {t("btn_yes_delete", "Да, удалить")}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
