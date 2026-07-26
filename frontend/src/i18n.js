import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Наш словарь с переводами
const resources = {
  ru: {
    translation: {
      "nav_services": "Услуги и цены",
      "nav_portfolio": "Портфолио",
      "nav_blog": "Блог",
      "nav_contacts": "Контакты",
      // Переводы для Hero
      "hero_title": "Премиальный детейлинг в Кракове",
      "hero_subtitle": "Профессиональный уход, защита кузова и химчистка. Вернем вашему автомобилю состояние нового.",
      "hero_btn": "Смотреть услуги",
      // Добавленные ключи для секции услуг
      "services_title": "Наши услуги и цены",
      "btn_choose": "Выбрать"
    }
  },
  pl: {
    translation: {
      "nav_services": "Usługi i ceny",
      "nav_portfolio": "Portfolio",
      "nav_blog": "Blog",
      "nav_contacts": "Kontakty",
      // Польские переводы для Hero
      "hero_title": "Detailing Premium w Krakowie",
      "hero_subtitle": "Profesjonalna pielęgnacja, ochrona lakieru i pranie tapicerki. Przywrócimy Twojemu autu wygląd nowości.",
      "hero_btn": "Zobacz usługi",
      // Добавленные ключи dla sekcji usług
      "services_title": "Nasze usługi i ceny",
      "btn_choose": "Wybierz"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru", // Язык по умолчанию
    fallbackLng: "ru", // Запасной язык
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;