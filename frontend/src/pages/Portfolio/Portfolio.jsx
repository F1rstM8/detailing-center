import React from "react";
import "./Portfolio.scss";

// Временные данные для портфолио
const mockWorks = [
  {
    id: 1,
    title: "BMW M5 Competition",
    desc: "Восстановительная полировка и нанесение керамики в 2 слоя. Срок работы: 3 дня.",
  },
  {
    id: 2,
    title: "Audi RS6",
    desc: "Полная оклейка кузова матовой полиуретановой пленкой. Химчистка салона.",
  },
  {
    id: 3,
    title: "Mercedes-Benz G-Class",
    desc: "Комплексный детейлинг экстерьера, чистка рамы, обработка кожи в салоне.",
  },
  {
    id: 4,
    title: "Porsche 911",
    desc: "Легкая полировка, оклейка зон риска, гидрофобное покрытие на стекла.",
  },
  {
    id: 5,
    title: "Lexus LX 600",
    desc: "Глубокая химчистка светлого салона с защитой кожи керамическим составом.",
  },
  {
    id: 6,
    title: "Tesla Model S",
    desc: "Тонировка стекол по ГОСТу, антихром пакета, полировка фар.",
  },
];

const Portfolio = () => {
  return (
    <main className="page-content portfolio-page">
      <h1 className="portfolio-page__title">Наши работы</h1>

      <div className="portfolio-page__grid">
        {mockWorks.map((work) => (
          <div key={work.id} className="portfolio-card">
            {/* Место под будущую фотографию */}
            <div className="portfolio-card__image-placeholder">Фото авто</div>

            <div className="portfolio-card__info">
              <h3>{work.title}</h3>
              <p>{work.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Portfolio;
