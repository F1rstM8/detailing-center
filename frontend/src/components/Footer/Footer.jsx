import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.scss";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        
        <div className="footer__column">
          <h3>{t("footer_about_title")}</h3>
          <p>{t("footer_about_text")}</p>
        </div>

        <div className="footer__column">
          <h3>{t("footer_nav_title")}</h3>
          <nav className="footer__nav">
            <Link to="/services">{t("nav_services")}</Link>
            <Link to="/portfolio">{t("nav_portfolio")}</Link>
            <Link to="/blog">{t("nav_blog")}</Link>
            <Link to="/contacts">{t("nav_contacts")}</Link>
          </nav>
        </div>

        <div className="footer__column">
          <h3>{t("footer_schedule_title", "Режим работы")}</h3>
          <p>{t("footer_schedule_weekdays", "Понедельник - Воскресенье: 09:00 - 19:00")}</p>
          <p>{t("footer_schedule_no_breaks", "Без перерывов")}</p>
        </div>

        <div className="footer__column">
          <h3>{t("footer_socials_title")}</h3>
          <nav className="footer__nav">
            <a
              href="https://www.instagram.com/d3_garage_pl/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
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
        <p>{t("footer_copyright")}</p>
      </div>
    </footer>
  );
};

export default Footer;