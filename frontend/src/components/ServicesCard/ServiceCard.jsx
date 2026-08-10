import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";

// 1. Добавляем onShowToast в принимаемые параметры
const ServiceCard = ({ service, onShowToast }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    // Добавляем в Redux
    dispatch(addItem(service));
    
    // 2. Убираем alert и вызываем нашу красивую плашку
    if (onShowToast) {
      onShowToast(service.title);
    }
  };

  return (
    <div className="service-card">
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
          onClick={handleAddToCart}
        >
          {t("btn_choose", "Выбрать")}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;