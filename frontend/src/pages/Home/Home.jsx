import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // 1. Импортируем хук
import { addItem } from "../../redux/cartSlice"; // 2. Импортируем экшен добавления
import Reviews from "../../components/Reviews/Reviews"; 
import servicesData from "../../data/services.json"; 
import "./Home.scss";

const Home = () => {
  const popularServices = servicesData.slice(0, 3);
  const dispatch = useDispatch(); // 3. Инициализируем dispatch

  // 4. Функция добавления в корзину
  const handleAddToCart = (service) => {
    dispatch(addItem({
      id: service.id,
      title: service.title,
      price: service.price, // Берем цену из JSON
      category: service.category || "Популярные услуги"
    }));
  };

  return (
    <main className="page-content home-page">
      {/* Первый экран (Hero) */}
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

      {/* Блок преимуществ */}
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

      {/* Блок: Популярные услуги */}
      <section className="home-services-section">
        <h2>Популярные услуги</h2>
        <div className="home-services-grid">
          {popularServices.map((service) => (
            <div key={service.id} className="home-service-card">
              <h3>{service.title}</h3>
              <p className="desc">{service.description}</p>
              <div className="footer">
                <span className="price">от {service.price} PLN</span>
                {/* 5. Добавляем кнопку В корзину */}
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

      {/* Вызываем наш новый компонент с отзывами */}
      <Reviews />
    </main>
  );
};

export default Home;