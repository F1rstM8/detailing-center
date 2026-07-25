import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <nav className="footer__links">
          <a href="/#services">Услуги</a>
          <a href="/#portfolio">Портфолио</a>
          <a href="/#blog">Блог</a>
          <a href="/#contacts">Контакты</a>
        </nav>
        <div className="footer__copy">
          &copy; {new Date().getFullYear()} Detailing Center. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;