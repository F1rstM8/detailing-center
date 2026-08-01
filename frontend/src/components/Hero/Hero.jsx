import React from 'react';
import { useTranslation } from 'react-i18next'; 
import { Link } from 'react-router-dom'; // 1. Импортируем Link для маршрутизации
import './Hero.scss';

const Hero = () => {
  const { t } = useTranslation(); 

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 dangerouslySetInnerHTML={{ __html: t('hero_title').replace('Кракове', '<span>Кракове</span>') }} />
          <p>{t('hero_subtitle')}</p>
          
          {/* 2. Меняем обычный тег <a> на <Link>, чтобы вести на страницу полного прайс-листа */}
          <Link to="/services" className="hero__btn">
            {t('hero_btn')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;