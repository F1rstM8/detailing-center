import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import { getServices } from "../../redux/servicesSlice";
import { getLocalizedField } from "../../helpers/getLocalizedField";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const { items: servicesData, status, error } = useSelector((state) => state.services);
  
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  const currentLang = i18n.language;

  const showToast = (serviceTitle) => {
    setToastMessage(serviceTitle);
    
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getServices());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <section className="page-content services-page">
        <div className="services-loader">
          {t("loading_services_list", "Загрузка прайс-листа...")}
        </div>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="page-content services-page">
        <div className="services-error" style={{ textAlign: "center", padding: "50px" }}>
          <p>Произошла ошибка при загрузке: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-content services-page">
      <div className="services-container">
        <h2>{t("services_page_title", "Полный прайс-лист")}</h2>
        <p className="services-subtitle">
          {t("services_page_subtitle", "Выберите необходимые услуги для ухода за вашим автомобилем")}
        </p>

        <div className="services-grid">
          {servicesData.map((service) => {
            const localizedService = {
              ...service,
              title: getLocalizedField(service, "title", currentLang),
              description: getLocalizedField(service, "description", currentLang),
              category: getLocalizedField(service, "category", currentLang),
              time: getLocalizedField(service, "time", currentLang),
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
    </section>
  );
};

export default ServicesPage;