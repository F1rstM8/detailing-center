
import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { value: "ru", label: "Русский" },
  { value: "pl", label: "Polski" },
];

const LanguageSelector = ({ className = "" }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      className={`header__lang ${className}`}
      onChange={handleLanguageChange}
      value={i18n.language}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;