import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addItem } from "../../redux/cartSlice";
import "./Home.scss";

import AboutDetailing from "../../components/AboutDetailing/AboutDetailing";
import services from "../../data/services.json";

const Home = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; 

  const handleAddToCart = (service) => {
    // Формируем безопасный объект для Корзины, передавая строку, а не объект с языками
    const cartItem = {
      id: service.id,
      title: service.title[currentLang], // Берем название на текущем языке
      price: service.price,
    };
    
    dispatch(addItem(cartItem));
  };

  return (
    <main className="home-page">
      
      <AboutDetailing />

      <section id="services" className="services-section">
        <h1 className="services-section__title">{t('services_title')}</h1>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              
              <h3>{service.title[currentLang]}</h3>
              <p className="service-card__desc">{service.description[currentLang]}</p>

              <div className="service-card__footer">
                {/* Исправили € на PLN для единообразия */}
                <span className="price">{service.price} PLN</span>
                <button
                  className="order-btn"
                  onClick={() => handleAddToCart(service)}
                >
                  {t('btn_choose')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;