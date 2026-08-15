import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Безопасно получаем язык (обрезаем до 'ru' или 'pl')
  const currentLang = i18n.language ? i18n.language.slice(0, 2) : "ru";

  const showToast = (serviceTitle) => {
    setToastMessage(serviceTitle);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Загружаем услуги с защитой от кэша
  useEffect(() => {
    fetch(`http://localhost:3001/services?_t=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("🛑 РЕАЛЬНЫЕ ДАННЫЕ УСЛУГ:", data);
        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке услуг:", error);
        setIsLoading(false);
      });
  }, []);

  // Функция для подстановки текста в зависимости от языка с надежным фоллбэком
  const getLocalizedField = (item, fieldName) => {
    const localizedKey = `${fieldName}_${currentLang}`;
    // Проверяем языковой ключ, затем базовый, затем пробуем русский, и в крайнем случае пустую строку
    return item[localizedKey] || item[fieldName] || item[`${fieldName}_ru`] || "";
  };

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
            {servicesData.map((service) => {
              // Формируем безопасный объект для ServiceCard с переведенными полями
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