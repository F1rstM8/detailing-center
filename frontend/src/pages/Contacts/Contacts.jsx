import React from "react";
import { useTranslation } from "react-i18next";
import "./Contacts.scss";

const Contacts = () => {
  const { t } = useTranslation();

  return (
    <main className="page-content contacts-page">
      <div className="contacts-container">
        <header className="contacts-header">
          <h2>{t("contacts_title")}</h2>
          <p>{t("contacts_subtitle")}</p>
        </header>

        <div className="contacts-content">
          <div className="contacts-info">
            <div className="info-card">
              <div className="card-icon">📍</div>
              <div className="card-text">
                <h3>{t("contacts_address_title")}</h3>
                <p>ul. Długa 15, 31-147 Kraków</p>
                <p>{t("contacts_country")}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">📞</div>
              <div className="card-text">
                <h3>{t("contacts_phone_title")}</h3>
                <p>+48 123 456 789</p>
                <p>{t("contacts_working_hours_short")}</p>
              </div>
            </div>

            <div className="info-card">
              <div className="card-icon">✉️</div>
              <div className="card-text">
                <h3>{t("contacts_email_title")}</h3>
                <p>hello@detailing-krakow.pl</p>
                <div className="social-links">
                  <a 
                    href="https://www.instagram.com/d3_garage_pl/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="contacts-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d81986.20815462002!2d19.86479011110055!3d50.04674464522434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471644c0354e18d1%3A0xb46bb6b576478abf!2z0JrRgNCw0LrQvtCy!5e0!3m2!1sru!2spl!4v1700000000000!5m2!1sru!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contacts;