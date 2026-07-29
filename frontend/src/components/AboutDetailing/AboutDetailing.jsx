// ИЗМЕНИТЬ КАРТИНКИ НА НОВЫЕ СФОТКАНЫЕ НАМИ,ДАБЫ ИЗБЕЖАТЬ ПРОБЛЕМ 
import React from 'react';

import { useTranslation } from 'react-i18next';
import './AboutDetailing.scss';

const AboutDetailing = () => {
  const { t } = useTranslation();

  return (
    <section className="about-detailing">
      <div className="about-detailing__container">
        <h2 className="about-detailing__title">{t('about_title')}</h2>
        
        <ul className="about-detailing__list">
          <li><span>1</span> <p>{t('about_list_1')}</p></li>
          <li><span>2</span> <p>{t('about_list_2')}</p></li>
          <li><span>3</span> <p>{t('about_list_3')}</p></li>
          <li><span>4</span> <p>{t('about_list_4')}</p></li>
        </ul>

        <div className="about-detailing__cards">
          <div className="about-card">
            <div className="about-card__img-wrapper">
              <img src="/images/polishing.jpg" alt="Полировка" /> 
            </div>
            <h3>{t('about_card1_title')}</h3>
            <p>{t('about_card1_desc')}</p>
          </div>

          <div className="about-card">
            <div className="about-card__img-wrapper">
              <img src="/images/protection.jpg" alt="Покрытия" />
            </div>
            <h3>{t('about_card2_title')}</h3>
            <p>{t('about_card2_desc')}</p>
          </div>

          <div className="about-card">
            <div className="about-card__img-wrapper">
              <img src="/images/dry-cleaning.jpg" alt="Химчистка" />
            </div>
            <h3>{t('about_card3_title')}</h3>
            <p>{t('about_card3_desc')}</p>
          </div>
        </div>

        <div className="about-detailing__action">
          <a href="#services" className="about-btn">{t('about_btn')}</a>
        </div>
      </div>
    </section>
  );
};

export default AboutDetailing;