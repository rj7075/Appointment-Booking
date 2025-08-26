import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Treatments from "./pages/Treatments";
import BookAppointment from "./pages/BookAppointment";
import Therapists from "./pages/Therapists";
import Services from "./pages/Services";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminTherapists from "./pages/admin/AdminTherapists";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminServices from "./pages/admin/AdminServices";
import AdminTreatments from "./pages/admin/AdminTreatments";
import AdminUsers from "./pages/admin/AdminUsers";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminContacts from "./pages/admin/AdminContacts";
import Footer from "./components/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<Navigate to="appointments" />} />
          <Route path="therapists" element={<AdminTherapists />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="treatments" element={<AdminTreatments />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
