import React from "react";
import { useTranslation } from "react-i18next";
import "./Contacts.scss";

const Contacts = () => {
  const { t } = useTranslation();

  const contactCards = [
    {
      icon: "📍",
      titleKey: "contacts_address_title",
      lines: ["ul. Długa 15, 31-147 Kraków", t("contacts_country")],
    },
    {
      icon: "📞",
      titleKey: "contacts_phone_title",
      lines: ["+48 123 456 789", t("contacts_working_hours_short")],
    },
    {
      icon: "✉️",
      titleKey: "contacts_email_title",
      lines: ["hello@detailing-krakow.pl"],
      isEmailCard: true,
    },
  ];

  return (
    <main className="page-content contacts-page">
      <div className="contacts-container">
        <header className="contacts-header">
          <h2>{t("contacts_title")}</h2>
          <p>{t("contacts_subtitle")}</p>
        </header>

        <div className="contacts-content">
          <div className="contacts-info">
            {contactCards.map((card, index) => (
              <div className="info-card" key={index}>
                <div className="card-icon">{card.icon}</div>
                <div className="card-text">
                  <h3>{t(card.titleKey)}</h3>
                  {card.lines.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                  {card.isEmailCard && (
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
                  )}
                </div>
              </div>
            ))}
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