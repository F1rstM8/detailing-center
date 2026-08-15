import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Portfolio.scss";

const Portfolio = () => {
  // Вытаскиваем i18n
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
        console.error("Ошибка при загрузке портфолио:", error);
        setIsLoading(false);
      });
  }, []);

  // Узнаем текущий язык
  const currentLang = i18n.language;

  return (
    <main className="page-content portfolio-page">
      <div className="portfolio-container">
        
        <div className="portfolio-header">
          <h2>{t("portfolio_section_title")}</h2>
          <p>{t("portfolio_section_subtitle")}</p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
            {t("loading_portfolio", "Загрузка работ...")}
          </div>
        ) : (
          <div className="portfolio-grid">
            {portfolioItems.map((item) => {
              // Берем нужную категорию из базы
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
                    {/* Выводим категорию */}
                    <span className="category-badge">
                      {categoryText}
                    </span>
                    {/* Название машины не переводим, выводим item.title */}
                    <h3>{item.title}</h3>
                    <p>{t("portfolio_card_desc")}</p>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
};

export default Portfolio;