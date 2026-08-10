import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t } = useTranslation();
  
  // Стейты для данных и загрузки
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Стейт для всплывающего уведомления (toast)
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (serviceTitle) => {
    setToastMessage(serviceTitle);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Загружаем услуги с json-server при открытии страницы
  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке услуг:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="page-content services-page">
      <div className="services-container">
        <h2>{t("services_page_title", "Полный прайс-лист")}</h2>
        <p className="services-subtitle">
          {t("services_page_subtitle", "Выберите необходимые услуги для ухода за вашим автомобилем")}
        </p>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
            Загрузка прайс-листа...
          </div>
        ) : (
          <div className="services-grid">
            {servicesData.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onShowToast={showToast} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Всплывающее уведомление */}
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