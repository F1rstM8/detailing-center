# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## 🔐 Тестирование ролей и авторизации (Mock Auth)

На данном этапе (до подключения реального бэкенда) авторизация работает в тестовом режиме (заглушка). Роль пользователя определяется по введенному email-адресу при входе. Пароль может быть любым.

**Тестовые доступы:**
* **Администратор (Admin):** `admin@test.com`
* **Менеджер (Manager):** `manager@test.com`
* **Клиент (Client):** Любой другой корректный email (например, `client@test.com`)