import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";

const Header = () => {
  // Достаем массив услуг и общую сумму из Redux
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <header className="header">
      <div className="header__logo">
        <h2>Detailing Center</h2>
      </div>

      <nav className="header__nav">
        {/* Используем обычные ссылки-якоря со слэшем в начале (чтобы они работали и со страницы Корзины) */}
        <a href="/#services">Услуги и цены</a>
        <a href="/#portfolio">Портфолио</a>
        <a href="/#blog">Блог</a>
        <a href="/#contacts">Контакты</a>
      </nav>

      {/* Обертка для корзины и выбора языка */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Индикатор корзины */}
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            🛒 Корзина: <span style={{ color: "#fff" }}>{items.length}</span>
            {totalPrice > 0 && (
              <span style={{ color: "#4caf50", marginLeft: "8px" }}>
                ({totalPrice} €)
              </span>
            )}
          </div>
        </Link>

        <div className="header__lang">
          <select defaultValue="ru">
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="pl">Polski</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
