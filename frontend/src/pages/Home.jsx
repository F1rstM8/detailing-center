import React from "react";
import "./Home.scss"; // Подключаем новые стили

// Временная база данных услуг (пока нет бэкенда)
const mockServices = [
  {
    id: 1,
    title: "Комплексная мойка",
    price: "15 €",
    description:
      "Тщательная мойка кузова, уборка салона пылесосом, чистка стекол изнутри и снаружи.",
  },
  {
    id: 2,
    title: "Химчистка салона",
    price: "70 €",
    description:
      "Глубокая очистка всех элементов салона: сидений, пола, потолка и пластика.",
  },
  {
    id: 3,
    title: "Полировка кузова",
    price: "120 €",
    description:
      "Восстановительная многоэтапная полировка, устранение царапин и потертостей.",
  },
  {
    id: 4,
    title: "Керамическое покрытие",
    price: "200 €",
    description:
      "Надежная защита кузова на 1-2 года, мощный гидрофобный эффект и блеск.",
  },
];

const Home = () => {
  return (
    <main className="home-page">
      <section className="services-section">
        <h1 className="services-section__title">Наши услуги и цены</h1>

        <div className="services-grid">
          {/* Проходимся циклом по массиву и отрисовываем карточку для каждой услуги */}
          {mockServices.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>

              <div className="service-card__footer">
                <span className="price">{service.price}</span>
                {/* Пока кнопка ничего не делает, логику корзины/заявок напишем позже */}
                <button className="order-btn">Выбрать</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
