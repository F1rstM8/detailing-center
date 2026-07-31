import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addItem } from "../../redux/cartSlice"; // Подключаем экшен добавления
import servicesData from "../../data/services.json";
import "./Services.scss";

const Services = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("Все услуги");

  const categories = ["Все услуги", ...new Set(servicesData.map(item => item.category))];

  const filteredServices = activeCategory === "Все услуги" 
    ? servicesData 
    : servicesData.filter(item => item.category === activeCategory);

  const handleAddToCart = (service) => {
    // Формируем объект для корзины
    const itemToAdd = {
      id: service.id,
      title: service.title,
      price: service.price,
    };
    dispatch(addItem(itemToAdd)); // Отправляем в Redux
    alert(`Услуга "${service.title}" добавлена в корзину!`);
  };

  return (
    <main className="page-content services-page">
      <div className="services-container">
        
        <header className="services-header">
          <h2>{t("services_title", "Наши услуги и цены")}</h2>
          <p>{t("services_subtitle", "Выберите необходимые процедуры для вашего автомобиля")}</p>
        </header>

        {/* Фильтры категорий */}
        <div className="services-filters">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Список услуг */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-info">
                <span className="category-badge">{service.category}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-details">
                  <span className="time">⏱ {service.time}</span>
                  <span className="price">{service.price} PLN</span>
                </div>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(service)}
              >
                {t("add_to_cart", "В корзину")}
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Services;