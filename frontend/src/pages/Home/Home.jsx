import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import Reviews from "../../components/Reviews/Reviews";
import { useTranslation } from "react-i18next";
import "./Home.scss";

const Home = () => {
  const { t, i18n } = useTranslation();

  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading popular services:", error);
        setIsLoading(false);
      });
  }, []);

  const popularServices = servicesData.slice(0, 3);
  const currentLang = i18n.language;

  const handleAddToCart = (service, serviceTitle, serviceCategory) => {
    dispatch(
      addItem({
        id: service.id,
        title: serviceTitle,
        price: service.price,
        category: serviceCategory || t("home_popular_title"),
      }),
    );

    setAddedItems((prev) => ({ ...prev, [service.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [service.id]: false }));
    }, 1500);

    setToastMessage(serviceTitle);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const featureCards = [
    { icon: "✨", titleKey: "feature1_title", descKey: "feature1_desc" },
    { icon: "⏱️", titleKey: "feature2_title", descKey: "feature2_desc" },
    { icon: "🛡️", titleKey: "feature3_title", descKey: "feature3_desc" },
  ];

  return (
    <main className="page-content home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t("hero_title")}</h1>
          <p>{t("hero_subtitle")}</p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">
              {t("hero_btn")}
            </Link>
          </div>
        </div>
      </section>

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

        {isLoading ? (
          <div className="home-services-loader">
            {t("loading_services", "Загрузка услуг...")}
          </div>
        ) : (
          <div className="home-services-grid">
            {popularServices.map((service) => {
              const serviceTitle =
                currentLang === "pl" && service.title_pl
                  ? service.title_pl
                  : service.title_ru;
              const serviceDesc =
                currentLang === "pl" && service.description_pl
                  ? service.description_pl
                  : service.description_ru;
              const serviceCategory =
                currentLang === "pl" && service.category_pl
                  ? service.category_pl
                  : service.category_ru;

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
                      onClick={() =>
                        handleAddToCart(service, serviceTitle, serviceCategory)
                      }
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
    </main>
  );
};

export default Home;
