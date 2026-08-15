import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ service, onShowToast }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    dispatch(addItem(service));
    
    if (onShowToast) {
      onShowToast(service.title || t("service_default_title", "Услуга"));
    }
  };

  return (
    <div className="service-card">
      <div className="service-header">
        <span className="service-category">
          {service.category || t("service_default_category", "Услуга")}
        </span>
        <h3>{service.title || t("service_loading", "Загрузка...")}</h3>
      </div>
      
      <p className="service-desc">
        {service.description || t("service_no_desc", "Описание скоро появится")}
      </p>
      
      <div className="service-footer">
        <div className="service-details">
          <span className="service-time">
            ⏱ {service.time || "--"}
          </span>
          <span className="service-price">
            {service.price ? `${service.price} PLN` : "0 PLN"}
          </span>
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