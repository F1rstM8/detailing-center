import React from 'react';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <h1 className="hero__title">
        Премиальный детейлинг <span>в Кракове</span>
      </h1>
      <p className="hero__subtitle">
        Профессиональный уход, защита кузова и химчистка. Вернем вашему автомобилю состояние нового.
      </p>
      {/* Кнопка будет плавно скроллить к блоку с услугами */}
      <a href="/#services" className="hero__btn">
        Смотреть услуги
      </a>
    </section>
  );
};

export default Hero;