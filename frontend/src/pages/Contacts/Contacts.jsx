import React from "react";
import "./Contacts.scss"; // Подключаем наши новые стили

const Contacts = () => {
  return (
    <main className="page-content contacts-page">
      <h1 className="contacts-page__title">Свяжитесь с нами</h1>

      <div className="contacts-page__container">
        {/* Левый блок с информацией */}
        <div className="contacts-info">
          <h2>Наши контакты</h2>
          <p>
            <strong>Телефон:</strong> +48 123 456 789
          </p>
          <p>
            <strong>Email:</strong> info@detailing-center.com
          </p>
          <p>
            <strong>Адрес:</strong> г. Краков, ул. Примерная, 10
          </p>
          <p>
            <strong>Режим работы:</strong> Пн-Вс: 09:00 - 20:00
          </p>
        </div>

        {/* Правый блок с формой (пока только визуальная часть) */}
        <div className="contacts-form">
          <h2>Остались вопросы?</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Ваше имя" required />
            <input type="tel" placeholder="Номер телефона" required />
            <textarea placeholder="Ваш вопрос" rows="4" required></textarea>
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
