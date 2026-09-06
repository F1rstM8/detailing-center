import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { getServices } from "../../redux/servicesSlice";
import Reviews from "../../components/Reviews/Reviews";
import { useTranslation } from "react-i18next";
import { getLocalizedField } from "../../helpers/getLocalizedField";
import "./Home.scss";

const Home = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const {
    items: servicesData,
    status,
    error,
  } = useSelector((state) => state.services);

  const [addedItems, setAddedItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const toastTimerRef = useRef(null);
  const buttonTimersRef = useRef({});

  const currentLang = i18n.language ? i18n.language.slice(0, 2) : "ru";

  useEffect(() => {
    const buttonTimers = buttonTimersRef.current;

    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      Object.values(buttonTimers).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getServices());
    }
  }, [status, dispatch]);

  const popularServices = servicesData.slice(0, 3);

  const handleAddToCart = (service, serviceTitle) => {
    dispatch(
      addItem({
        id: service.id,
        price: service.price,
      }),
    );

    setAddedItems((prev) => ({ ...prev, [service.id]: true }));

    if (buttonTimersRef.current[service.id]) {
      clearTimeout(buttonTimersRef.current[service.id]);
    }

    buttonTimersRef.current[service.id] = setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [service.id]: false }));
    }, 1500);

    setToastMessage(serviceTitle);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const featureCards = [
    { icon: "✨", titleKey: "feature1_title", descKey: "feature1_desc" },
    { icon: "⏱️", titleKey: "feature2_title", descKey: "feature2_desc" },
    { icon: "🛡️", titleKey: "feature3_title", descKey: "feature3_desc" },
  ];

  return (
    <div className="page-content home-page">
      <section className="features-section">
        <h2>{t("home_features_title")}</h2>
        <div className="features-grid">
          {featureCards.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{t(feature.titleKey)}</h3>
              <p>{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-services-section">
        <h2>{t("home_popular_title")}</h2>

        {status === "loading" && (
          <div className="home-services-loader">
            {t("loading_services", "Загрузка услуг...")}
          </div>
        )}

        {status === "failed" && (
          <div
            className="home-services-error"
            style={{ textAlign: "center", color: "#e74c3c", padding: "20px" }}
          >
            Произошла ошибка при загрузке: {error}
          </div>
        )}

        {status === "succeeded" && (
          <div className="home-services-grid">
            {popularServices.map((service) => {
              const serviceTitle = getLocalizedField(
                service,
                "title",
                currentLang,
              );
              const serviceDesc = getLocalizedField(
                service,
                "description",
                currentLang,
              );
              const isAdded = addedItems[service.id];

              return (
                <div key={service.id} className="home-service-card">
                  <h3>{serviceTitle}</h3>
                  <p className="desc">{serviceDesc}</p>
                  <div className="footer">
                    <span className="price">
                      {t("price_from")} {service.price} PLN
                    </span>
                    <button
                      className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
                      onClick={() => handleAddToCart(service, serviceTitle)}
                      disabled={isAdded}
                    >
                      {isAdded
                        ? t("btn_added_to_cart", "В корзине!")
                        : t("btn_add_to_cart", "В корзину")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="home-services-action">
          <Link to="/services" className="btn-primary">
            {t("home_all_services_btn")}
          </Link>
        </div>
      </section>

      <Reviews />

      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-icon">✓</div>
          <div className="toast-text">
            {t("toast_service", "Услуга")} <strong>{toastMessage}</strong>{" "}
            {t("toast_added", "добавлена в корзину!")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
