import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.scss";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="error-code">404</span>
        <h1>{t("not_found_title", "Страница не найдена")}</h1>
        <p>
          {t(
            "not_found_desc",
            "Возможно, она была удалена или вы ввели неверный адрес."
          )}
        </p>
        <Link to="/" className="home-btn">
          {t("back_to_home", "На главную")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;