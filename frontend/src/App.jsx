import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Blog from "./pages/Blog/Blog";
import Portfolio from "./pages/Portfolio/Portfolio";
import Contacts from "./pages/Contacts/Contacts";

// 1. Импортируем наш компонент защиты маршрутов
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Временные заглушки для новых страниц (позже мы вынесем их в полноценные файлы)
const Profile = () => (
  <div style={{ padding: "100px 20px", color: "#fff", textAlign: "center" }}>
    <h2>Личный кабинет клиента</h2>
    <p>Здесь будет история заказов и календарь записей.</p>
  </div>
);

const AdminDashboard = () => (
  <div style={{ padding: "100px 20px", color: "#fff", textAlign: "center" }}>
    <h2>Панель администратора</h2>
    <p>Здесь будет управление заявками, статистика и расписание.</p>
  </div>
);

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Home />
      <Portfolio />
      <Blog />
      <Contacts />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <div style={{ flex: 1 }}>
          <Routes>
            {/* === ОТКРЫТЫЕ МАРШРУТЫ (Доступны всем) === */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* === ЗАЩИЩЕННЫЕ МАРШРУТЫ (Только для авторизованных) === */}
            
            {/* 1. Уровень: Клиенты и Персонал */}
            <Route element={<ProtectedRoute allowedRoles={['client', 'manager', 'admin']} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* 2. Уровень: Только Персонал (Менеджеры и Админы) */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'manager']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;