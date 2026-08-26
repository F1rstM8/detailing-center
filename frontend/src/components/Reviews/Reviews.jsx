
import { useTranslation } from "react-i18next";
import "./Reviews.scss";

const Reviews = () => {
  const { t } = useTranslation();

  const reviewsData = [
    {
      avatar: "A",
      nameKey: "review1_name",
      car: "Toyota Prius+",
      textKey: "review1_text",
      stars: "★★★★★",
    },
    {
      avatar: "M",
      nameKey: "review2_name",
      car: "Volkswagen Golf",
      textKey: "review2_text",
      stars: "★★★★★",
    },
  ];

  return (
    <section className="reviews-section">
      <h2>{t("reviews_title")}</h2>
      <div className="reviews-grid">
        {reviewsData.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <div className="avatar">{review.avatar}</div>
              <div className="user-info">
                <h4>{t(review.nameKey)}</h4>
                <span>{review.car}</span>
              </div>
            </div>
            <p>{t(review.textKey)}</p>
            <div className="stars">{review.stars}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;