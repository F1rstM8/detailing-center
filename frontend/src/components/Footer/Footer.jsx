import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        <div className="footer__column">
          <h3>Детейлинг Центр</h3>
          <p>
            Премиальный уход за вашим автомобилем. 
            Мы используем только лучшую автохимию и даем гарантию на все виды работ.
          </p>
        </div>

        <div className="footer__column">
          <h3>Навигация</h3>
          <nav className="footer__nav">
            <a href="/#services">Услуги и цены</a>
            <a href="/#portfolio">Портфолио</a>
            <a href="/#blog">Блог</a>
            <a href="/#contacts">Контакты</a>
          </nav>
        </div>

        <div className="footer__column">
          <h3>Режим работы</h3>
          <p>Понедельник - Пятница: 09:00 - 20:00</p>
          <p>Суббота - Воскресенье: 10:00 - 18:00</p>
          <p>Без перерывов</p>
        </div>

      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 Детейлинг Центр в Кракове. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;