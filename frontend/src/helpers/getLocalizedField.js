// src/helpers/getLocalizedField.js

export const getLocalizedField = (item, fieldName, currentLang) => {
  if (!item) return "";
  
  // Определяем язык (по умолчанию русский, если не польский)
  const lang = currentLang?.startsWith("pl") ? "pl" : "ru";
  
  // Ищем поле вида title_pl или title_ru. Если его нет — отдаем базовое поле.
  return item[`${fieldName}_${lang}`] || item[fieldName] || "";
};