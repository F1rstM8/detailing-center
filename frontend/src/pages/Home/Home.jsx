import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import Reviews from "../../components/Reviews/Reviews";
import { useTranslation } from "react-i18next";
import "./Home.scss";

const Home = () => {
  // Достаем i18n, чтобы знать текущий язык
  const { t, i18n } = useTranslation();

  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке популярных услуг:", error);
        setIsLoading(false);
      });
  }, []);

  const popularServices = servicesData.slice(0, 3);
  
  // Определяем текущий язык
  const currentLang = i18n.language;

  const handleAddToCart = (service, serviceTitle, serviceCategory) => {
    dispatch(
      addItem({
        id: service.id,
        title: serviceTitle, // Передаем переведенный тайтл
        price: service.price,
        category: serviceCategory || t("home_popular_title"), 
      }),
    );
  };

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
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>{t("feature1_title")}</h3>
            <p>{t("feature1_desc")}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>{t("feature2_title")}</h3>
            <p>{t("feature2_desc")}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>{t("feature3_title")}</h3>
            <p>{t("feature3_desc")}</p>
          </div>
        </div>
      </section>

      <section className="home-services-section">
        <h2>{t("home_popular_title")}</h2>
        
        {isLoading ? (
          <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0" }}>
            {t("loading_services")}
          </div>
        ) : (
          <div className="home-services-grid">
            {popularServices.map((service) => {
              // Достаем правильные поля в зависимости от языка
              const serviceTitle = currentLang === 'pl' && service.title_pl ? service.title_pl : service.title_ru;
              const serviceDesc = currentLang === 'pl' && service.description_pl ? service.description_pl : service.description_ru;
              const serviceCategory = currentLang === 'pl' && service.category_pl ? service.category_pl : service.category_ru;

              return (
                <div key={service.id} className="home-service-card">
                  <h3>{serviceTitle}</h3>
                  <p className="desc">{serviceDesc}</p>
                  <div className="footer">
                    <span className="price">{t("price_from")} {service.price} PLN</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(service, serviceTitle, serviceCategory)}
                    >
                      {t("btn_add_to_cart")}
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
    </main>
  );
};

export default Home;