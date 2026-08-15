import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutDetailing.scss";

const AboutDetailing = () => {
  const { t } = useTranslation();

  const listItems = [
    t("about_list_1"),
    t("about_list_2"),
    t("about_list_3"),
    t("about_list_4"),
  ];

  const cardsData = [
    {
      img: "/images/polishing.jpg",
      altKey: "about_card1_alt",
      titleKey: "about_card1_title",
      descKey: "about_card1_desc",
    },
    {
      img: "/images/protection.jpg",
      altKey: "about_card2_alt",
      titleKey: "about_card2_title",
      descKey: "about_card2_desc",
    },
    {
      img: "/images/dry-cleaning.jpg",
      altKey: "about_card3_alt",
      titleKey: "about_card3_title",
      descKey: "about_card3_desc",
    },
  ];

  return (
    <section className="about-detailing">
      <div className="about-detailing__container">
        <h2 className="about-detailing__title">{t("about_title")}</h2>

        <ul className="about-detailing__list">
          {listItems.map((text, index) => (
            <li key={index}>
              <span>{index + 1}</span>
              <p>{text}</p>
            </li>
          ))}
        </ul>

        <div className="about-detailing__cards">
          {cardsData.map((card, index) => (
            <div className="about-card" key={index}>
              <div className="about-card__img-wrapper">
                <img src={card.img} alt={t(card.altKey)} />
              </div>
              <h3>{t(card.titleKey)}</h3>
              <p>{t(card.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="about-detailing__action">
          <a href="#services" className="about-btn">
            {t("about_btn")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutDetailing;
