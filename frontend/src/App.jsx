
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Blog from "./pages/Blog/Blog";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import Portfolio from "./pages/Portfolio/Portfolio";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Contacts from "./pages/Contacts/Contacts";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacts" element={<Contacts />} />

            <Route
              element={
                <ProtectedRoute allowedRoles={["client", "manager", "admin"]} />
              }
            >
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route
              element={<ProtectedRoute allowedRoles={["manager", "admin"]} />}
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
