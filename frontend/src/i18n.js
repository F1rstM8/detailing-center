import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      // --- НАВИГАЦИЯ И ШАПКА ---
      nav_services: "Услуги и цены",
      nav_portfolio: "Портфолио",
      nav_blog: "Блог",
      nav_contacts: "Контакты",
      nav_admin_panel: "Панель управления",
      btn_login: "Войти",
      btn_register: "Регистрация",
      btn_logout: "Выйти",

      // --- ГЛАВНАЯ СТРАНИЦА (Home.jsx) ---
      hero_title: "Премиальный детейлинг в Кракове",
      hero_subtitle:
        "Профессиональный уход, защита кузова и химчистка. Вернем вашему автомобилю состояние нового.",
      hero_btn: "Смотреть услуги",

      home_features_title: "Почему выбирают нас?",
      feature1_title: "Премиальные материалы",
      feature1_desc:
        "Используем только проверенную химию и керамику от лучших мировых брендов.",
      feature2_title: "Соблюдение сроков",
      feature2_desc:
        "Ценим ваше время. Отдаем готовый автомобиль точно в оговоренный день и час.",
      feature3_title: "Гарантия качества",
      feature3_desc:
        "Предоставляем официальную гарантию на защитные покрытия и оклейку пленкой.",

      home_popular_title: "Популярные услуги",
      home_all_services_btn: "Смотреть весь прайс-лист",
      loading_services: "Загрузка услуг...",
      price_from: "от",
      btn_add_to_cart: "В корзину",

      // --- ОТЗЫВЫ (Reviews) ---
      reviews_title: "Отзывы клиентов",
      review1_name: "Алексей",
      review1_text:
        '"Отличная работа! Сделали полную химчистку салона и полировку. Машина выглядит лучше, чем когда забирал из салона. Однозначно рекомендую парней!"',
      review2_name: "Матеуш",
      review2_text:
        '"Клеили защитную полиуретановую пленку на переднюю часть. Все швы спрятаны идеально, пленку вообще не видно. Спасибо за профессионализм."',

      // --- ПОРТФОЛИО (Наши работы) ---
      portfolio_section_title: "Наши работы",
      portfolio_section_subtitle:
        "Посмотрите на результаты работы наших мастеров",
      tag_ceramic: "КЕРАМИЧЕСКОЕ ПОКРЫТИЕ",
      tag_film: "ПОЛНАЯ ОКЛЕЙКА ПЛЕНКОЙ",
      tag_dry_clean: "ХИМЧИСТКА САЛОНА",
      portfolio_card_desc:
        "Профессиональный уход и защита лакокрасочного покрытия.",
      tag_antichrome: "АНТИХРОМ И ПОЛИРОВКА",

      // --- СТРАНИЦА УСЛУГ ---
      services_title: "Наши услуги и цены",
      btn_choose: "Выбрать",

      // --- БЛОГ (Blog) ---
      blog_page_title: "Блог о детейлинге",
      loading_posts: "Загрузка статей...",
      blog_read_more: "Читать далее →",
      blog_hide: "Скрыть",

      // --- КОРЗИНА И ОФОРМЛЕНИЕ ЗАКАЗА ---
      cart_title: "Ваша корзина",
      cart_page_title: "Ваша заявка", // Добавлено для заголовка страницы
      cart_checkout_title: "Оформление", // Добавлено для блока справа
      cart_items_count: "Количество услуг:", // Добавлено
      cart_pcs: "шт.", // Добавлено
      cart_total_pay: "К оплате:", // Добавлено
      cart_auth_required:
        "Оформление заказа доступно только зарегистрированным пользователям.", // Добавлено
      cart_login_btn: "Войти в аккаунт", // Добавлено
      cart_empty:
        "Корзина пока пуста. Перейдите на главную страницу, чтобы выбрать услуги.",
      cart_remove: "Удалить",
      cart_total: "Итого к оплате",
      cart_checkout: "Оформить заказ",
      cart_success_title: "🎉 Заявка успешно отправлена!",
      cart_success_desc:
        "Наш менеджер скоро свяжется с вами для уточнения деталей времени записи.",
      filter_all_services: "Все услуги",
      alert_service_added: "Услуга добавлена:",
      add_to_cart: "В корзину",

      // --- БЛОК "О НАС" ---
      about_title: "Что такое детейлинг и зачем?",
      about_list_1:
        "Это высококачественная и безопасная мойка кузова, удаление старой грязи, налетов, битума, следов от насекомых и металлических вкраплений.",
      about_list_2:
        "Полировка кузова — единственный способ удалить следы некачественных моек, мелких царапин, водного камня, потертостей, помутнений и матовости лакокрасочного покрытия.",
      about_list_3:
        "Нанесение защитных покрытий, которые придают глубину цвета, уменьшают скорость загрязнения кузова и упрощают мойку и дальнейший уход.",
      about_list_4:
        "Детальная чистка салона, от ковра и потолка, до каждой щели между кнопками. Профилактика и защита от преждевременного износа и быстрого загрязнения.",
      about_card1_title: "Детейлинг полировка",
      about_card1_desc:
        "Локальная полировка, косметическая полировка, восстанавливающая полировка, коррекционная полировка, полировка фар, маскировка царапин.",
      about_card2_title: "Защитные покрытия",
      about_card2_desc:
        "Керамические покрытия, твердый натуральный воск, гибридные воски, силанты, антидождь.",
      about_card3_title: "Детейлинг химчистка",
      about_card3_desc:
        "Комплексная химчистка салона, чистка отдельных элементов, уход за кожей, чистка системы вентиляции.",
      about_btn: "СМОТРЕТЬ ЦЕНЫ НА УСЛУГИ",

      // --- КОНТАКТЫ (Contacts) ---
      contacts_title: "Наши контакты",
      contacts_subtitle:
        "Мы всегда на связи и готовы привести ваш автомобиль в идеальное состояние.",
      contacts_address_title: "Адрес студии",
      contacts_country: "Польша",
      contacts_phone_title: "Телефон",
      contacts_working_hours_short: "Пн-Сб, с 09:00 до 20:00",
      contacts_email_title: "Email и Соцсети",

      // --- ФУТЕР (Footer) ---
      footer_about_title: "Детейлинг Центр",
      footer_about_text:
        "Премиальный уход за вашим автомобилем. Мы используем только лучшую автохимию и даем гарантию на все виды работ.",
      footer_nav_title: "Навигация",
      footer_schedule_title: "Режим работы",
      footer_schedule_weekdays: "Понедельник - Пятница: 09:00 - 20:00",
      footer_schedule_weekends: "Суббота - Воскресенье: 10:00 - 18:00",
      footer_schedule_no_breaks: "Без перерывов",
      footer_socials_title: "Мы в соцсетях",
      footer_copyright: "© 2026 D3garage. Все права защищены.",

      // --- ЛИЧНЫЙ КАБИНЕТ ---
      profile_title: "Личный кабинет",
      profile_orders: "Ваши заказы",
      profile_no_orders: "У вас пока нет заказов",
      // --- СТРАНИЦА УСЛУГ ---
      services_page_title: "Полный прайс-лист",
      services_page_subtitle: "Выберите необходимые услуги для ухода за вашим автомобилем",

      // --- ЛИЧНЫЙ КАБИНЕТ И МОКИ ---
      profile_guest: "Гость",
      mock_client_name: "Постоянный клиент",
      mock_car_status: "Не указан",
      profile_admin: "Администратор",
      profile_car: "Автомобиль:",
      profile_all_orders: "Все заявки (Панель управления)",
      profile_my_orders: "Мои заявки и автомобили",
      profile_no_orders_admin: "В системе пока нет заказов.",
      profile_order_from: "От",
      profile_order_total: "Итого:",
      profile_delete_confirm:
        "Вы уверены, что хотите безвозвратно удалить этот заказ?",

      // --- ПАНЕЛЬ АДМИНИСТРАТОРА ---
      admin_title: "Панель управления",
      admin_subtitle: "Управление заявками и статусами автомобилей",
      admin_stat_revenue: "Выручка",
      admin_stat_total: "Всего",
      admin_stat_new: "Новых",
      admin_stat_progress: "В работе",
      admin_stat_done: "Готово",
      admin_popularity_title: "График востребованности услуг",
      admin_current_orders: "Текущие заявки",
      admin_no_orders: "Новых заявок пока нет.",

      // --- КАРТОЧКА ЗАКАЗА И СТАТУСЫ ---
      order_client: "Клиент",
      order_phone: "Телефон",
      order_services_list: "Выбранные услуги",
      order_total_pay: "Итого к оплате",
      btn_to_progress: "В работу",
      btn_to_done: "Выполнено",
      btn_delete: "Удалить",
      status_new: "Новый",
      status_progress: "В работе",
      status_done: "Выполнено",
      toast_service: "Услуга",
      toast_added: "добавлена в корзину!",

      // --- ФОРМЫ АВТОРИЗАЦИИ (Formik) ---
      auth_login_title: "Вход",
      auth_register_title: "Регистрация",
      auth_name: "Ваше имя",
      auth_email: "Email",
      auth_password: "Пароль",
      auth_phone: "Телефон",
      auth_submit_login: "Войти",
      auth_submit_register: "Зарегистрироваться",
      auth_no_account: "Нет аккаунта?",
      auth_has_account: "Уже есть аккаунт?",

      // --- ВАЛИДАЦИЯ (Ошибки) ---
      val_required: "Обязательное поле",
      val_email: "Неверный формат email",
      val_pass_min: "Пароль должен быть не менее 6 символов",
    },
  },
  pl: {
    translation: {
      // --- NAWIGACJA I HEADER ---
      nav_services: "Usługi i ceny",
      nav_portfolio: "Portfolio",
      nav_blog: "Blog",
      nav_contacts: "Kontakty",
      nav_admin_panel: "Panel zarządzania",
      btn_login: "Zaloguj się",
      btn_register: "Rejestracja",
      btn_logout: "Wyloguj się",

      // --- STRONA GŁÓWNA (Home.jsx) ---
      hero_title: "Detailing Premium w Krakowie",
      hero_subtitle:
        "Profesjonalna pielęgnacja, ochrona lakieru i pranie tapicerki. Przywrócimy Twojemu autu wygląd nowości.",
      hero_btn: "Zobacz usługi",

      home_features_title: "Dlaczego warto nas wybrać?",
      feature1_title: "Materiały premium",
      feature1_desc:
        "Używamy tylko sprawdzonej chemii i ceramiki od najlepszych światowych marek.",
      feature2_title: "Dotrzymywanie terminów",
      feature2_desc:
        "Cenimy Twój czas. Oddajemy gotowy samochód dokładnie w umówionym dniu i o wyznaczonej godzinie.",
      feature3_title: "Gwarancja jakości",
      feature3_desc:
        "Udzielamy oficjalnej gwarancji na powłoki ochronne i oklejanie folią.",

      home_popular_title: "Popularne usługi",
      home_all_services_btn: "Zobacz cały cennik",
      loading_services: "Ładowanie usług...",
      price_from: "od",
      btn_add_to_cart: "Do koszyka",

      // --- OPINIE (Отзывы) ---
      reviews_title: "Opinie klientów",
      review1_name: "Aleksiej",
      review1_text:
        '"Świetna robota! Wykonali kompleksowe pranie tapicerki i polerowanie. Samochód wygląda lepiej niż przy odbiorze z salonu. Zdecydowanie polecam chłopaków!"',
      review2_name: "Mateusz",
      review2_text:
        '"Oklejali przód ochronną folią poliuretanową. Wszystkie krawędzie są idealnie ukryte, folii w ogóle nie widać. Dziękuję za profesjonalizm."',

      // --- PORTFOLIO (Наши работы) ---
      portfolio_section_title: "Nasze realizacje",
      portfolio_section_subtitle: "Zobacz efekty pracy naszych specjalistów",
      tag_ceramic: "POWŁOKA CERAMICZNA",
      tag_film: "PEŁNE OKLEJANIE FOLIĄ",
      tag_dry_clean: "CZYSZCZENIE WNĘTRZA",
      portfolio_card_desc:
        "Profesjonalna pielęgnacja i ochrona powłoki lakierniczej.",
      tag_antichrome: "DECHROMING I POLEROWANIE",

      // --- STRONA USŁUG ---
      
      services_page_title: "Pełny cennik",
      services_page_subtitle: "Wybierz usługi do pielęgnacji Twojego samochodu",
      services_title: "Nasze usługi i ceny",
      btn_choose: "Wybierz",
      filter_all_services: "Wszystkie usługi",
      alert_service_added: "Usługa dodana:",
      add_to_cart: "Do koszyka",

      // --- BLOG (Блог) ---
      blog_page_title: "Blog o detailingu",
      loading_posts: "Ładowanie artykułów...",
      blog_read_more: "Czytaj dalej →",
      blog_hide: "Zwiń",

      // --- KOSZYK I ZAMÓWIENIE ---
      cart_title: "Twój koszyk",
      cart_page_title: "Twoje zgłoszenie", // Добавлено
      cart_checkout_title: "Podsumowanie", // Добавлено
      cart_items_count: "Ilość usług:", // Добавлено
      cart_pcs: "szt.", // Добавлено
      cart_total_pay: "Do zapłaty:", // Добавлено
      cart_auth_required:
        "Złożenie zamówienia jest dostępne tylko dla zalogowanych użytkowników.", // Добавлено
      cart_login_btn: "Zaloguj się na konto", // Добавлено
      cart_empty:
        "Koszyk jest na razie pusty. Przejdź na stronę główną, aby wybrać usługi.",
      cart_remove: "Usuń",
      cart_total: "Razem do zapłaty",
      cart_checkout: "Złóż zamówienie",
      cart_success_title: "🎉 Zamówienie zostało pomyślnie złożone!",
      cart_success_desc:
        "Nasz menedżer wkrótce skontaktuje się z Tobą w celu ustalenia szczegółów wizyty.",

      // --- SEKCJA "O NAS" ---
      about_title: "Co to jest detailing i dlaczego warto?",
      about_list_1:
        "To wysokiej jakości i bezpieczne mycie karoserii, usuwanie starego brudu, osadów, smoły, śladów po owadach i opiłków metalicznych.",
      about_list_2:
        "Polerowanie karoserii to jedyny sposób na usunięcie śladów po słabych myjniach, drobnych rys, osadów z twardej wody, zmatowień i utraty połysku lakieru.",
      about_list_3:
        "Aplikacja powłok ochronnych, które nadają głębię koloru, spowalniają brudzenie się karoserii oraz ułatwiają mycie i dalszą pielęgnację.",
      about_list_4:
        "Szczegółowe czyszczenie wnętrza, od dywaników i podsufitki, aż po każdą szczelinę między przyciskami. Profilaktyka i ochrona przed przedwczesnym zużyciem i szybkim brudzeniem.",
      about_card1_title: "Detailingowe polerowanie",
      about_card1_desc:
        "Polerowanie lokalne, polerowanie kosmetyczne, polerowanie renowacyjne, polerowanie korekcyjne, polerowanie reflektorów, maskowanie rys.",
      about_card2_title: "Powłoki ochronne",
      about_card2_desc:
        "Powłoki ceramiczne, twardy naturalny wosk, woski hybrydowe, sealanty, niewidzialna wycieraczka.",
      about_card3_title: "Detailingowe czyszczenie wnętrza",
      about_card3_desc:
        "Kompleksowe pranie tapicerki, czyszczenie poszczególnych elementów, pielęgnacja skóry, czyszczenie układu wentylacji.",
      about_btn: "ZOBACZ CENY USŁUG",

      // --- KONTAKTY (Контакты) ---
      contacts_title: "Nasze kontakty",
      contacts_subtitle:
        "Jesteśmy zawsze w kontakcie i gotowi, aby doprowadzić Twój samochód do idealnego stanu.",
      contacts_address_title: "Adres studia",
      contacts_country: "Polska",
      contacts_phone_title: "Telefon",
      contacts_working_hours_short: "Pon-Sob, od 09:00 do 20:00",
      contacts_email_title: "Email i Social Media",

      // --- STOPKA (Футер) ---
      footer_about_title: "Centrum Detailingu",
      footer_about_text:
        "Premium pielęgnacja Twojego samochodu. Używamy tylko najlepszej chemii samochodowej i dajemy gwarancję na wszystkie usługi.",
      footer_nav_title: "Nawigacja",
      footer_schedule_title: "Godziny otwarcia",
      footer_schedule_weekdays: "Poniedziałek - Piątek: 09:00 - 20:00",
      footer_schedule_weekends: "Sobota - Niedziela: 10:00 - 18:00",
      footer_schedule_no_breaks: "Bez przerw",
      footer_socials_title: "Znajdź nas",
      footer_copyright: "© 2026 D3garage. Wszelkie prawa zastrzeżone.",

      // --- PANEL KLIENTA ---
      profile_title: "Panel klienta",
      profile_orders: "Twoje zamówienia",
      profile_no_orders: "Nie masz jeszcze żadnych zamówień",

      // --- PANEL KLIENTA I MOCKI ---
      profile_guest: "Gość",
      mock_client_name: "Stały klient",
      mock_car_status: "Nie podano",
      profile_admin: "Administrator",
      profile_car: "Samochód:",
      profile_all_orders: "Wszystkie zgłoszenia (Panel zarządzania)",
      profile_my_orders: "Moje zgłoszenia i samochody",
      profile_no_orders_admin: "W systemie nie ma jeszcze żadnych zamówień.",
      profile_order_from: "Od",
      profile_order_total: "Razem:",
      profile_delete_confirm:
        "Czy na pewno chcesz bezpowrotnie usunąć to zamówienie?",
        toast_service: "Usługa",
      toast_added: "dodana do koszyka!",

      // --- PANEL ADMINISTRATORA ---
      admin_title: "Panel zarządzania",
      admin_subtitle: "Zarządzanie zamówieniami i statusami pojazdów",
      admin_stat_revenue: "Przychód",
      admin_stat_total: "Wszystkie",
      admin_stat_new: "Nowe",
      admin_stat_progress: "W trakcie",
      admin_stat_done: "Gotowe",
      admin_popularity_title: "Wykres popularności usług",
      admin_current_orders: "Aktualne zamówienia",
      admin_no_orders: "Brak nowych zamówień.",

      // --- KARTA ZAMÓWIENIA I STATUSY ---
      order_client: "Klient",
      order_phone: "Telefon",
      order_services_list: "Wybrane usługi",
      order_total_pay: "Razem do zapłaty",
      btn_to_progress: "Do realizacji",
      btn_to_done: "Zakończ",
      btn_delete: "Usuń",
      status_new: "Nowy",
      status_progress: "W trakcie",
      status_done: "Zakończono",

      // --- FORMY AUTORYZACJI (Formik) ---
      auth_login_title: "Logowanie",
      auth_register_title: "Rejestracja",
      auth_name: "Twoje imię",
      auth_email: "Email",
      auth_password: "Hasło",
      auth_phone: "Telefon",
      auth_submit_login: "Zaloguj się",
      auth_submit_register: "Zarejestruj się",
      auth_no_account: "Nie masz konta?",
      auth_has_account: "Masz już konto?",

      // --- WALIDACJA (Błędy) ---
      val_required: "Pole wymagane",
      val_email: "Nieprawidłowy format email",
      val_pass_min: "Hasło musi mieć co najmniej 6 znaków",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
