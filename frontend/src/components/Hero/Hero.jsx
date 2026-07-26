import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Импортируем хук
import './Hero.scss';

const Hero = () => {
  const { t } = useTranslation(); // 2. Достаем функцию перевода (здесь i18n не нужен, т.к. мы не переключаем язык кнопкой)

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          {/* 3. Меняем жесткий текст на функцию t() */}
          <h1 dangerouslySetInnerHTML={{ __html: t('hero_title').replace('Кракове', '<span>Кракове</span>') }} />
          <p>{t('hero_subtitle')}</p>
          <a href="#services" className="hero__btn">{t('hero_btn')}</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;