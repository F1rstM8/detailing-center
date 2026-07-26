import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next"; // 1. Импортируем хук для переводов
import { addItem } from "../../redux/cartSlice";
import "./Home.scss";

// Импортируем данные об услугах из JSON
import services from "../../data/services.json";

const Home = () => {
  const dispatch = useDispatch();
  
  // 2. Достаем t для перевода интерфейса и i18n для получения текущего языка
  const { t, i18n } = useTranslation();
  
  // 3. Сохраняем текущий язык ('ru' или 'pl') в переменную
  const currentLang = i18n.language; 

  const handleAddToCart = (service) => {
    dispatch(addItem(service));
  };

  return (
    <main className="home-page">
      <section id="services" className="services-section">
        {/* Переводим заголовок секции */}
        <h1 className="services-section__title">{t('services_title')}</h1>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              
              {/* 4. Выводим название и описание из JSON по текущему языку */}
              <h3>{service.title[currentLang]}</h3>
              <p className="service-card__desc">{service.description[currentLang]}</p>

              <div className="service-card__footer">
                <span className="price">{service.price} €</span>
                <button
                  className="order-btn"
                  onClick={() => handleAddToCart(service)}
                >
                  {/* Переводим текст на кнопке */}
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