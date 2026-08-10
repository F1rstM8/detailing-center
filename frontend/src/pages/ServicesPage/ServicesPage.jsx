import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import servicesData from "../../data/services.json";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t } = useTranslation();
  
  // 1. Стейт для хранения названия добавленной услуги
  const [toastMessage, setToastMessage] = useState(null);

  // 2. Функция, которая показывает уведомление и сама его скрывает через 3 секунды
  const showToast = (serviceTitle) => {
    setToastMessage(serviceTitle);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <main className="page-content services-page">
      <div className="services-container">
        <h2>{t("services_page_title", "Полный прайс-лист")}</h2>
        <p className="services-subtitle">
          {t("services_page_subtitle", "Выберите необходимые услуги для ухода за вашим автомобилем")}
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              // 3. Передаем функцию в карточку
              onShowToast={showToast} 
            />
          ))}
        </div>
      </div>

      {/* 4. Верстка самого всплывающего уведомления */}
      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-icon">✓</div>
          <div className="toast-text">
            Услуга <strong>{toastMessage}</strong> добавлена в корзину!
          </div>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;