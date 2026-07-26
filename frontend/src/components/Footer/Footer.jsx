import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__column">
          <h3>Детейлинг Центр</h3>
          <p>
            Премиальный уход за вашим автомобилем. Мы используем только лучшую
            автохимию и даем гарантию на все виды работ.
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

        {/* Новая колонка для социальных сетей */}
        <div className="footer__column">
          <h3>Мы в соцсетях</h3>
          <nav className="footer__nav">
            <a
              href="https://www.instagram.com/d3_garage_pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link" /* <-- Используем класс вместо style */
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Instagram
            </a>
          </nav>
        </div>
      </div>

      <div className="footer__bottom">
      <p>&copy; 2026 D3garage. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
