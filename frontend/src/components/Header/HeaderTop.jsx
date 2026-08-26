
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { COMPANY_CONTACTS } from "../../data/companyInfo.js";

const HeaderTop = () => {
    const { t } = useTranslation();
  return (
    <div className="header__top">
      <div className="header__top-container">
        <div className="header__top-left">
          <span className="header__info-item">
            📍 {COMPANY_CONTACTS.address}
          </span>
          <span className="header__info-item">
            🕒 {t("contacts_working_hours_short")}
          </span>
        </div>

        <div className="header__top-right">
          <a
            href={`mailto:${COMPANY_CONTACTS.email}`}
            className="header__info-item header__info-link"
          >
            ✉️ {COMPANY_CONTACTS.email}
          </a>

          <a
            href={COMPANY_CONTACTS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="header__info-item header__info-link"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ verticalAlign: "middle" }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>{" "}
            Instagram
          </a>

          <a
            href={`tel:${COMPANY_CONTACTS.phone.replace(/\s+/g, "")}`}
            className="header__phone"
          >
            📞 {COMPANY_CONTACTS.phone}
          </a>

          <LanguageSelector />
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
