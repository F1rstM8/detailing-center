import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Portfolio.scss";

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/portfolio")
      .then((response) => response.json())
      .then((data) => {
        setPortfolioItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading portfolio:", error);
        setIsLoading(false);
      });
  }, []);

  const currentLang = i18n.language;

  if (isLoading) {
    return (
      
      <div className="page-content portfolio-page">
        <div className="portfolio-loader">{t("loading_portfolio", "Загрузка работ...")}</div>
      </div>
    );
  }

  return (
   
    <section className="page-content portfolio-page">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2>{t("portfolio_section_title")}</h2>
          <p>{t("portfolio_section_subtitle")}</p>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item) => {
            const categoryText = currentLang === 'pl' && item.category_pl ? item.category_pl : item.category_ru;

            return (
              <div key={item.id} className="portfolio-card">
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="card-overlay">
                    <span>{t("portfolio_view_project", "Смотреть проект")}</span>
                  </div>
                </div>

                <div className="card-content">
                  <span className="category-badge">
                    {categoryText}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{t("portfolio_card_desc")}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;