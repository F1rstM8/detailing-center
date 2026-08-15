import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addItem } from "../../redux/cartSlice";
import "./Services.scss";

const Services = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  // 1. ИСПРАВЛЕНИЕ: Гарантированно получаем только 'ru' или 'pl'
  const currentLang = i18n.language ? i18n.language.slice(0, 2) : "ru";

  useEffect(() => {
    // 2. ИСПРАВЛЕНИЕ: Сбрасываем кэш браузера уникальным параметром времени
    fetch(`http://localhost:3001/services?_t=${Date.now()}`)
      .then((response) => response.json())
      .then((data) => {
        // Выводим данные в консоль браузера (F12) для проверки
        console.log("🛑 ДАННЫЕ С СЕРВЕРА:", data);
        console.log("🛑 ТЕКУЩИЙ ЯЗЫК:", currentLang);

        setServicesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке услуг:", error);
        setIsLoading(false);
      });
  }, []);

  // Универсальная функция для получения текста (понимает и старую, и новую базу)
  const getLocalizedField = (item, fieldName) => {
    const localizedKey = `${fieldName}_${currentLang}`;
    return item[localizedKey] || item[fieldName] || "";
  };

  // Собираем уникальные категории
  const categories = [
    "ALL",
    ...new Set(
      servicesData
        .map((item) => getLocalizedField(item, "category"))
        .filter(Boolean),
    ),
  ];

  // Фильтруем услуги
  const filteredServices =
    activeCategory === "ALL"
      ? servicesData
      : servicesData.filter(
          (item) => getLocalizedField(item, "category") === activeCategory,
        );

  const handleAddToCart = (service) => {
    const serviceTitle = getLocalizedField(service, "title");
    const serviceCategory = getLocalizedField(service, "category");

    const itemToAdd = {
      id: service.id,
      title: serviceTitle,
      price: service.price,
      category: serviceCategory || t("services_default_category", "Услуги"),
    };

    dispatch(addItem(itemToAdd));
    alert(`${t("alert_service_added", "Услуга добавлена:")} ${serviceTitle}`);
  };

  return (
    <main className="page-content services-page">
      <div className="services-container">
        <header className="services-header">
          <h2>{t("services_title", "Наши услуги и цены")}</h2>
          <p>
            {t(
              "services_subtitle",
              "Выберите необходимые процедуры для вашего автомобиля",
            )}
          </p>
        </header>

        {isLoading ? (
          <div
            style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}
          >
            {t("loading_services", "Загрузка услуг...")}
          </div>
        ) : (
          <>
            <div className="services-filters">
              {categories.map((category, index) => {
                const isAll = category === "ALL";
                const displayCategory = isAll
                  ? t("filter_all_services", "Все услуги")
                  : category;

                return (
                  <button
                    key={index}
                    className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {displayCategory}
                  </button>
                );
              })}
            </div>

            <div className="services-grid">
              {filteredServices.map((service) => {
                // Достаем поля через нашу умную функцию
                const serviceTitle = getLocalizedField(service, "title");
                const serviceDesc = getLocalizedField(service, "description");
                const serviceCategory = getLocalizedField(service, "category");
                const serviceTime = getLocalizedField(service, "time");

                return (
                  <div key={service.id} className="service-card">
                    <div className="service-info">
                      <span className="category-badge">{serviceCategory}</span>
                      <h3>{serviceTitle}</h3>
                      <p>{serviceDesc}</p>
                      <div className="service-details">
                        <span className="time">⏱ {serviceTime}</span>
                        <span className="price">{service.price} PLN</span>
                      </div>
                    </div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(service)}
                    >
                      {t("add_to_cart", "В корзину")}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Services;
