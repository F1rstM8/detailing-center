import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import Reviews from "../../components/Reviews/Reviews"; 
import servicesData from "../../data/services.json"; 
import "./Home.scss";

const Home = () => {
  const popularServices = servicesData.slice(0, 3);
  const dispatch = useDispatch();

  const handleAddToCart = (service) => {
    dispatch(addItem({
      id: service.id,
      title: service.title,
      price: service.price,
      category: service.category || "Популярные услуги"
    }));
  };

  return (
    <main className="page-content home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Премиальный уход за вашим автомобилем</h1>
          <p>
            Детейлинг-студия в Кракове. Мы возвращаем автомобилям заводской блеск 
            и защищаем кузов на долгие годы.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn-primary">Смотреть услуги</Link>
            <Link to="/portfolio" className="btn-secondary">Наши работы</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Почему выбирают нас?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Премиальные материалы</h3>
            <p>Используем только проверенную химию и керамику от лучших мировых брендов.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Соблюдение сроков</h3>
            <p>Ценим ваше время. Отдаем готовый автомобиль точно в оговоренный день и час.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Гарантия качества</h3>
            <p>Предоставляем официальную гарантию на защитные покрытия и оклейку пленкой.</p>
          </div>
        </div>
      </section>

      <section className="home-services-section">
        <h2>Популярные услуги</h2>
        <div className="home-services-grid">
          {popularServices.map((service) => (
            <div key={service.id} className="home-service-card">
              <h3>{service.title}</h3>
              <p className="desc">{service.description}</p>
              <div className="footer">
                <span className="price">от {service.price} PLN</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(service)}
                >
                  В корзину
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="home-services-action">
          <Link to="/services" className="btn-primary">Смотреть весь прайс-лист</Link>
        </div>
      </section>

      <Reviews />
    </main>
  );
};

export default Home;