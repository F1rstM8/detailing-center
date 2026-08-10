import React, { useState, useEffect } from "react";
import "./Portfolio.scss";

const Portfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Стучимся на сервер за картинками портфолио
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

  return (
    <main className="page-content portfolio-page">
      <div className="portfolio-container">
        
        <div className="portfolio-header">
          <h2>Наши работы</h2>
          <p>Посмотрите на результаты работы наших мастеров</p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>
            Загрузка работ...
          </div>
        ) : (
          <div className="portfolio-grid">
            {portfolioItems.map((item) => (
              <div key={item.id} className="portfolio-card">
                
                {/* Блок картинки с overlay */}
                <div className="card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="card-overlay">
                    <span>Смотреть проект</span>
                  </div>
                </div>

                {/* Блок текстового контента под картинкой */}
                <div className="card-content">
                  <span className="category-badge">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>Профессиональный уход и защита лакокрасочного покрытия.</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Portfolio;