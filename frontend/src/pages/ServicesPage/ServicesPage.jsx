import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice"; // Проверь правильность пути до cartSlice
import servicesData from "../../data/services.json"; // Проверь правильность пути до твоего json
import "./ServicesPage.scss";

const ServicesPage = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (service) => {
    // Отправляем объект услуги целиком в корзину
    dispatch(addItem(service));
    // Небольшое уведомление (потом можно заменить на красивый тост)
    alert(`Услуга "${service.title}" добавлена в корзину!`);
  };

  return (
    <main className="page-content services-page">
      <div className="services-container">
        <h2>Полный прайс-лист</h2>
        <p className="services-subtitle">
          Выберите необходимые услуги для ухода за вашим автомобилем
        </p>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <span className="service-category">{service.category}</span>
                <h3>{service.title}</h3>
              </div>
              
              <p className="service-desc">{service.description}</p>
              
              <div className="service-footer">
                <div className="service-details">
                  <span className="service-time">⏱ {service.time}</span>
                  <span className="service-price">{service.price} PLN</span>
                </div>
                
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(service)}
                >
                  Выбрать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ServicesPage;