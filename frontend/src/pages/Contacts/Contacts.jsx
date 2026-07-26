import React, { useState } from 'react';
import './Contacts.scss';

const Contacts = () => {
  // Состояние для хранения данных формы
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    question: ''
  });

  // Состояние для показа успешного сообщения
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Функция, которая обновляет данные при вводе текста
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Функция отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы
    
    // В реальном проекте здесь будет код отправки на сервер или в Telegram
    console.log('Отправленные данные:', formData);
    
    // Показываем сообщение об успехе
    setIsSubmitted(true);
    
    // Очищаем поля формы
    setFormData({ name: '', phone: '', question: '' });

    // Возвращаем форму обратно через 5 секунд
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contacts" className="page-content contacts-page">
      <h1 className="contacts-page__title">Свяжитесь с нами</h1>
      
      <div className="contacts-page__container">
        {/* Левый блок с информацией */}
        <div className="contacts-info">
          <h2>Наши контакты</h2>
          <p><strong>Телефон:</strong> +48 123 456 789</p>
          <p><strong>Email:</strong> info@detailing-center.com</p>
          <p><strong>Адрес:</strong> г. Краков, ул. Примерная, 10</p>
          <p><strong>Режим работы:</strong> Пн-Вс: 09:00 - 20:00</p>
        </div>
        
        {/* Правый блок с формой или уведомлением */}
        <div className="contacts-form">
          {isSubmitted ? (
            <div className="success-message">
              <h3>Спасибо за обращение!</h3>
              <p>Мы получили ваш вопрос и перезвоним вам в ближайшее время для консультации.</p>
            </div>
          ) : (
            <>
              <h2>Остались вопросы?</h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ваше имя" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Номер телефона" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
                <textarea 
                  name="question"
                  placeholder="Ваш вопрос" 
                  rows="4" 
                  value={formData.question}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit">Отправить</button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contacts;