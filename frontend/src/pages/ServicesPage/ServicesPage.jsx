import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const currentLang = i18n.language ? i18n.language.slice(0, 2) : "ru";

  const showToast = (serviceTitle) => {
    setToastMessage(serviceTitle);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/services?_t=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading services:", error);
        setIsLoading(false);
      });
  }, []);

  const getLocalizedField = (item, fieldName) => {
    const localizedKey = `${fieldName}_${currentLang}`;
    return item[localizedKey] || item[fieldName] || item[`${fieldName}_ru`] || "";
  };

  if (isLoading) {
    return (
      <main className="page-content services-page">
        <div className="services-loader">
          {t("loading_services_list", "Загрузка прайс-листа...")}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content services-page">
      <div className="services-container">
        <h2>{t("services_page_title", "Полный прайс-лист")}</h2>
        <p className="services-subtitle">
          {t("services_page_subtitle", "Выберите необходимые услуги для ухода за вашим автомобилем")}
        </p>

        <div className="services-grid">
          {servicesData.map((service) => {
            const localizedService = {
              ...service,
              title: getLocalizedField(service, "title"),
              description: getLocalizedField(service, "description"),
              category: getLocalizedField(service, "category"),
              time: getLocalizedField(service, "time"),
            };

            return (
              <ServiceCard 
                key={service.id} 
                service={localizedService} 
                onShowToast={showToast} 
              />
            );
          })}
        </div>
      </div>

      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-icon">✓</div>
          <div className="toast-text">
            {t("toast_service", "Услуга")} <strong>{toastMessage}</strong> {t("toast_added", "добавлена в корзину!")}
          </div>
        </div>
      )}
    </main>
  );
};

export default ServicesPage;