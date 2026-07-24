import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#242424",
        color: "white",
      }}
    >
      <div className="logo">
        {/* Заглушка. Позже заменим на тег <img> с твоей фотографией */}
        <h2>Detailing Center</h2>
      </div>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Услуги и цены
        </Link>
        <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>
          Блог
        </Link>
        <Link
          to="/portfolio"
          style={{ color: "white", textDecoration: "none" }}
        >
          Портфолио
        </Link>
        <Link to="/contacts" style={{ color: "white", textDecoration: "none" }}>
          Контакты
        </Link>
      </nav>

      <div className="language-selector">
        <select
          defaultValue="ru"
          style={{ padding: "5px", borderRadius: "4px" }}
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="pl">Polski</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
