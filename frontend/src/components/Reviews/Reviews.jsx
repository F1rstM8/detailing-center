import React from "react";
import { useTranslation } from "react-i18next";
import "./Reviews.scss"; // Твой файл стилей

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section className="reviews-section">
      <h2>{t("reviews_title")}</h2>
      <div className="reviews-grid">
        
        {/* Отзыв 1 */}
        <div className="review-card">
          <div className="review-header">
            <div className="avatar">A</div>
            <div className="user-info">
              <h4>{t("review1_name")}</h4>
              <span>Toyota Prius+</span> {/* Марку машины можно не переводить */}
            </div>
          </div>
          <p>{t("review1_text")}</p>
          <div className="stars">★★★★★</div>
        </div>

        {/* Отзыв 2 */}
        <div className="review-card">
          <div className="review-header">
            <div className="avatar">M</div>
            <div className="user-info">
              <h4>{t("review2_name")}</h4>
              <span>Volkswagen Golf</span>
            </div>
          </div>
          <p>{t("review2_text")}</p>
          <div className="stars">★★★★★</div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;