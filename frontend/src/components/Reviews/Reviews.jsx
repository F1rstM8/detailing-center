import React from "react";
import reviewsData from "./reviews.json"; // Импортируем данные из JSON
import "./Reviews.scss";

const Reviews = () => {
  return (
    <section className="reviews-section">
      <h2>Отзывы клиентов</h2>
      <div className="reviews-grid">
        {reviewsData.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="avatar">{review.avatar}</div>
              <div>
                <h4>{review.name}</h4>
                <span>{review.car}</span>
              </div>
            </div>
            <p className="review-text">"{review.text}"</p>
            <div className="rating">{review.rating}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;