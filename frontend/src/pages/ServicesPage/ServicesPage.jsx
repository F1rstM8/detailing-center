import React from "react";
import { useTranslation } from "react-i18next";
import servicesData from "../../data/services.json";
import ServiceCard from "../../components/ServicesCard/ServiceCard";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <main className="page-content services-page">
      <div className="services-container">
        {/* Добавляем ключи для будущих переводов в i18n */}
        <h2>{t("services_page_title", "Полный прайс-лист")}</h2>
        <p className="services-subtitle">
          {t("services_page_subtitle", "Выберите необходимые услуги для ухода за вашим автомобилем")}
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;