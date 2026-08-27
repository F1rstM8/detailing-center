import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Reviews.scss";
import reviewsData from "./reviews.json";

const Reviews = () => {
  const { t } = useTranslation();

  return (
    <section className="reviews-section">
      <h2>{t("reviews_title", "Отзывы клиентов")}</h2>

      <div className="reviews-carousel-wrapper">
        <div className="custom-arrow custom-prev"></div>
        <div className="custom-arrow custom-next"></div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          allowTouchMove={true}
          breakpoints={{
            768: {
              slidesPerView: 2,

              allowTouchMove: false,
            },
          }}
          className="reviews-swiper"
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <div className="review-header">
                  <div className="avatar">{review.avatar}</div>
                  <div className="reviewer-info">
                    <h4>{review.name}</h4>
                    <span>{review.car}</span>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="rating">{"⭐".repeat(review.rating)}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
