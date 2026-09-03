export const getLocalizedField = (item, fieldName, currentLang) => {
  if (!item) return "";

  const lang = currentLang?.startsWith("pl") ? "pl" : "ru";

  return item[`${fieldName}_${lang}`] || item[fieldName] || "";
};
