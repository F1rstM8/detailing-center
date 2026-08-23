# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Версия node.js v24.15.0

## 🔐 Тестирование ролей и авторизации (Mock Auth)

**Тестовые доступы:(пароль любой)**

- **Администратор (Admin):** `admin@test.com`
- **Менеджер (Manager):** `manager@test.com`(пока не работает)
- **Клиент (Client):** Любой другой корректный email (например, `client@test.com`)

# Detailing Center Web App

## Как запустить проект локально

Проект состоит из двух частей: фронтенд (React) и бэкенд (json-server). Для работы приложения необходимо запустить обе части в разных терминалах.

### Шаг 1. Запуск бэкенда (База данных)

1. Откройте терминал и перейдите в папку бэкенда:
   `cd backend`
2. Установите зависимости (если необходимо):
   `npm install`
3. Запустите сервер базы данных:
   `npm start`
   Сервер запустится на http://localhost:3001

### Шаг 2. Запуск фронтенда

1. Откройте второй терминал и перейдите в папку фронтенда:
   `cd frontend`
2. Установите зависимости:
   `npm install`
3. Запустите React-приложение:
   `npm run dev`
   Приложение будет доступно по адресу http://localhost:5173


