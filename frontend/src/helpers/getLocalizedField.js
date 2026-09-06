export const getLocalizedField = (item, fieldName, currentLang) => {
  if (!item) return "";

  const lang = currentLang ? currentLang.slice(0, 2) : "ru";

  if (lang === "pl" && item[`${fieldName}_pl`]) {
    return item[`${fieldName}_pl`];
  }

  return item[`${fieldName}_ru`] || item[fieldName];
};
