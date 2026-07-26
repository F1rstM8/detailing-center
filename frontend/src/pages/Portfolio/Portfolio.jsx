import React from 'react';
import './Portfolio.scss';
// Импортируем наши данные
import works from '../../data/portfolio.json';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio-section">
      <h2 className="portfolio-section__title">Наши <span>работы</span></h2>
      
      <div className="portfolio-section__grid">
        {works.map((work) => (
          <div key={work.id} className="portfolio-section__item">
            <img src={work.image} alt={work.title} />
            <div className="overlay">
              <h3>{work.title}</h3>
              <p>{work.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;