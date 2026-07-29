import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Наш словарь с переводами
const resources = {
  ru: {
    translation: {
      nav_services: "Услуги и цены",
      nav_portfolio: "Портфолио",
      nav_blog: "Блог",
      nav_contacts: "Контакты",
      // Переводы для Hero
      hero_title: "Премиальный детейлинг в Кракове",
      hero_subtitle:
        "Профессиональный уход, защита кузова и химчистка. Вернем вашему автомобилю состояние нового.",
      hero_btn: "Смотреть услуги",
      // Добавленные ключи для секции услуг
      services_title: "Наши услуги и цены",
      btn_choose: "Выбрать",
      // Переводы для Корзины
      cart_title: "Ваша корзина",
      cart_empty: "Корзина пока пуста. Перейдите на главную страницу, чтобы выбрать услуги.",
      cart_remove: "Удалить",
      cart_total: "Итого к оплате",
      cart_checkout: "Оформить заказ",
      cart_success_title: "🎉 Заявка успешно отправлена!",
      cart_success_desc: "Наш менеджер скоро свяжется с вами для уточнения деталей времени записи.",
      // Секция "Что такое детейлинг"
      about_title: "Что такое детейлинг и зачем?",
      about_list_1: "Это высококачественная и безопасная мойка кузова, удаление старой грязи, налетов, битума, следов от насекомых и металлических вкраплений.",
      about_list_2: "Полировка кузова — единственный способ удалить следы некачественных моек, мелких царапин, водного камня, потертостей, помутнений и матовости лакокрасочного покрытия.",
      about_list_3: "Нанесение защитных покрытий, которые придают глубину цвета, уменьшают скорость загрязнения кузова и упрощают мойку и дальнейший уход.",
      about_list_4: "Детальная чистка салона, от ковра и потолка, до каждой щели между кнопками. Профилактика и защита от преждевременного износа и быстрого загрязнения.",
      about_card1_title: "Детейлинг полировка",
      about_card1_desc: "Локальная полировка, косметическая полировка, восстанавливающая полировка, коррекционная полировка, полировка фар, маскировка царапин.",
      about_card2_title: "Защитные покрытия",
      about_card2_desc: "Керамические покрытия, твердый натуральный воск, гибридные воски, силанты, антидождь.",
      about_card3_title: "Детейлинг химчистка",
      about_card3_desc: "Комплексная химчистка салона, чистка отдельных элементов, уход за кожей, чистка системы вентиляции.",
      about_btn: "СМОТРЕТЬ ЦЕНЫ НА УСЛУГИ",
    },
  },
  pl: {
    translation: {
      nav_services: "Usługi i ceny",
      nav_portfolio: "Portfolio",
      nav_blog: "Blog",
      nav_contacts: "Kontakty",
      // Польские переводы для Hero
      hero_title: "Detailing Premium w Krakowie",
      hero_subtitle:
        "Profesjonalna pielęgnacja, ochrona lakieru i pranie tapicerki. Przywrócimy Twojemu autu wygląd nowości.",
      hero_btn: "Zobacz usługi",
      // Добавленные ключи dla sekcji usług
      services_title: "Nasze usługi i ceny",
      btn_choose: "Wybierz",
      // Переводы для Корзины
      cart_title: "Twój koszyk",
      cart_empty: "Koszyk jest na razie pusty. Przejdź na stronę główną, aby wybrać usługi.",
      cart_remove: "Usuń",
      cart_total: "Razem do zapłaty",
      cart_checkout: "Złóż zamówienie",
      cart_success_title: "🎉 Zamówienie zostało pomyślnie złożone!",
      cart_success_desc: "Nasz menedżer wkrótce skontaktuje się z Tobą w celu ustalenia szczegółów.",
      // Sekcja "Co to jest detailing"
      about_title: "Co to jest detailing i dlaczego warto?",
      about_list_1: "To wysokiej jakości i bezpieczne mycie karoserii, usuwanie starego brudu, osadów, smoły, śladów po owadach i opiłków metalicznych.",
      about_list_2: "Polerowanie karoserii to jedyny sposób na usunięcie śladów po słabych myjniach, drobnych rys, osadów z twardej wody, zmatowień i utraty połysku lakieru.",
      about_list_3: "Aplikacja powłok ochronnych, które nadają głębię koloru, spowalniają brudzenie się karoserii oraz ułatwiają mycie i dalszą pielęgnację.",
      about_list_4: "Szczegółowe czyszczenie wnętrza, od dywaników i podsufitki, aż po każdą szczelinę między przyciskami. Profilaktyka i ochrona przed przedwczesnym zużyciem i szybkim brudzeniem.",
      about_card1_title: "Detailingowe polerowanie",
      about_card1_desc: "Polerowanie lokalne, polerowanie kosmetyczne, polerowanie renowacyjne, polerowanie korekcyjne, polerowanie reflektorów, maskowanie rys.",
      about_card2_title: "Powłoki ochronne",
      about_card2_desc: "Powłoki ceramiczne, twardy naturalny wosk, woski hybrydowe, sealanty, niewidzialna wycieraczka.",
      about_card3_title: "Detailingowe czyszczenie wnętrza",
      about_card3_desc: "Kompleksowe pranie tapicerki, czyszczenie poszczególnych elementów, pielęgnacja skóry, czyszczenie układu wentylacji.",
      about_btn: "ZOBACZ CENY USŁUG",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru", // Язык по умолчанию
  fallbackLng: "ru", // Запасной язык
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;