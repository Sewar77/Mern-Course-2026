import "./App.css";
import LandingHome from "./components/Home/LandingHome.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/Users/UserDashboard.jsx";
import Register from "./components/Auth/Register.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import DisplayUsers from "./components/Admin/Users/DsiplayUsers.jsx";
import DisplayCategories from "./components/Admin/Categories/DisplayCategories.jsx";
import DisplayProducts from "./components/Admin/Products/DisplayProducts.jsx";
import About from "./components/Shared/About.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Messages from "./components/Admin/Messages/Messages.jsx"
import ContactUs from "./components/Contact/ContactUs.jsx";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* define routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/messages" element={<Messages />} />
          <Route
            path="/admin/dashboard/products"
            element={<DisplayProducts />}
          />
          <Route
            path="/admin/dashboard/categories"
            element={<DisplayCategories />}
          />
          <Route path="/admin/dashboard/users" element={<DisplayUsers />} />
          <Route path="/user/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
