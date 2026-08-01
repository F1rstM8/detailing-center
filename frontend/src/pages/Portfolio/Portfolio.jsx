import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import portfolioItems from "../../data/portfolio.json";
import "./Portfolio.scss";

const Portfolio = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Все работы");

  const categories = ["Все работы", ...new Set(portfolioItems.map(item => item.category))];

  const filteredItems = activeFilter === "Все работы" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <main className="page-content portfolio-page">
      <div className="portfolio-container">
        
        <header className="portfolio-header">
          <h2>{t("portfolio_title", "Наши работы")}</h2>
          <p>{t("portfolio_subtitle", "Оцените качество нашей работы на реальных примерах.")}</p>
        </header>

        <div className="portfolio-filters">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`filter-btn ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="portfolio-card">
              <div className="card-image">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay">
                  <span>Смотреть детали</span>
                </div>
              </div>
              <div className="card-content">
                <span className="category-badge">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Portfolio;