import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ service }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    dispatch(addItem(service));
    // В идеале позже заменить alert на красивое уведомление (toast)
    alert(`Услуга "${service.title}" добавлена в корзину!`); 
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