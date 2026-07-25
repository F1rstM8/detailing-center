import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss"; // Подключаем наши стили

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <h2>Detailing Center</h2>
      </div>

      <nav className="header__nav">
        <Link to="/">Услуги и цены</Link>
        <Link to="/blog">Блог</Link>
        <Link to="/portfolio">Портфолио</Link>
        <Link to="/contacts">Контакты</Link>
      </nav>

      <div className="header__lang">
        <select defaultValue="ru">
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
