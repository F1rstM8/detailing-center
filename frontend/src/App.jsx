import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Blog from "./pages/Blog/Blog";
import ServicesPage from './pages/ServicesPage/ServicesPage'; 
import Portfolio from "./pages/Portfolio/Portfolio";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Contacts from "./pages/Contacts/Contacts";

// Импортируем наш компонент защиты маршрутов
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
            <Route path="/services" element={<ServicesPage />} /> {/* Добавили роут для услуг */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* === ЗАЩИЩЕННЫЕ МАРШРУТЫ (Только для авторизованных) === */}

            {/* 1. Уровень: Клиенты и Персонал */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["client", "manager", "admin"]} />
              }
            >
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* 2. Уровень: Только Персонал (Менеджеры и Админы) */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["manager", "admin"]} />
              }
            >
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