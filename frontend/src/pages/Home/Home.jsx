import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import Reviews from "../../components/Reviews/Reviews";
import { useTranslation } from "react-i18next";
import "./Home.scss";

const Home = () => {
  // Инициализируем хук перевода
  const { t } = useTranslation();

  // 1. Создаем локальный стейт для услуг и статуса загрузки
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();

  // 2. Получаем данные с сервера при первой загрузке страницы
  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data); // Сохраняем скачанные услуги в стейт
        setIsLoading(false);   // Отключаем лоадер
      })
      .catch((error) => {
        console.error("Ошибка при загрузке популярных услуг:", error);
        setIsLoading(false);
      });
  }, []);

  // Высчитываем популярные услуги (берем первые 3) только после того, как данные загрузились
  const popularServices = servicesData.slice(0, 3);

  const handleAddToCart = (service) => {
    dispatch(
      addItem({
        id: service.id,
        title: service.title,
        price: service.price,
        // Переводим категорию по умолчанию, если она не пришла с бэкенда
        category: service.category || t("home_popular_title"), 
      }),
    );
  };

  return (
    <main className="page-content home-page">
      <section className="hero-section">
        <div className="hero-content">
          {/* Динамический перевод текста */}
          <h1>{t("hero_title")}</h1>
          <p>{t("hero_subtitle")}</p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">
              {t("hero_btn_services")}
            </Link>
            <Link to="/portfolio" className="btn-secondary">
              {t("hero_btn_portfolio")}
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
        
        {/* 3. Условный рендеринг: показываем текст загрузки, пока данные летят с сервера */}
        {isLoading ? (
          <div style={{ textAlign: "center", color: "#aaa", padding: "40px 0" }}>
            {t("loading_services")}
          </div>
        ) : (
          <div className="home-services-grid">
            {popularServices.map((service) => (
              <div key={service.id} className="home-service-card">
                {/* Названия и описания услуг берутся из БД, их оставляем как есть */}
                <h3>{service.title}</h3>
                <p className="desc">{service.description}</p>
                <div className="footer">
                  <span className="price">{t("price_from")} {service.price} PLN</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(service)}
                  >
                    {t("btn_add_to_cart")}
                  </button>
                </div>
              </div>
            ))}
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