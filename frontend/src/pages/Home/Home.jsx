import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import "./Home.scss";

// Импортируем данные об услугах из JSON
import services from "../../data/services.json";

const Home = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (service) => {
    dispatch(addItem(service));
  };

  return (
    <main className="home-page">
      {/* Добавили id="services" для якорной ссылки */}
      <section id="services" className="services-section">
        <h1 className="services-section__title">Наши услуги и цены</h1>

        <div className="services-grid">
          {/* Используем импортированный массив services */}
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>

              <div className="service-card__footer">
                
               <span className="price">{service.price} €</span>
                <button
                  className="order-btn"
                  onClick={() => handleAddToCart(service)}
                >
                  Выбрать
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
