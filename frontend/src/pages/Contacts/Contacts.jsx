
import { useTranslation } from "react-i18next";
import { COMPANY_CONTACTS } from "../../data/companyInfo.js";
import "./Contacts.scss";

const Contacts = () => {
  const { t } = useTranslation();

  const contactCards = [
    {
      icon: "📍",
      titleKey: "contacts_address_title",
      lines: [COMPANY_CONTACTS.address, t("contacts_country")],
    },
    {
      icon: "📞",
      titleKey: "contacts_phone_title",
      lines: [COMPANY_CONTACTS.phone, t("contacts_working_hours_short")],
    },
    {
      icon: "✉️",
      titleKey: "contacts_email_title",
      lines: [COMPANY_CONTACTS.email],
      isEmailCard: true,
    },
  ];

  return (
    <section className="page-content contacts-page">
      <div className="contacts-container">
        <header className="contacts-header">
          <h2>{t("contacts_title")}</h2>
          <p>{t("contacts_subtitle")}</p>
        </header>

        <div className="contacts-content">
          <div className="contacts-info">
            {contactCards.map((card, index) => (
              
              <article className="info-card" key={index}>
                <div className="card-icon">{card.icon}</div>
               
                <address className="card-text" style={{ fontStyle: 'normal' }}>
                  <h3>{t(card.titleKey)}</h3>
                  {card.lines.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                  {card.isEmailCard && (
                    <div className="social-links">
                      <a
                        href={COMPANY_CONTACTS.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        Instagram
                      </a>
                    </div>
                  )}
                </address>
              </article>
            ))}
          </div>

          <div className="contacts-map">
            <iframe
              src={COMPANY_CONTACTS.mapEmbedUrl}
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
    </section>
  );
};

export default Contacts;