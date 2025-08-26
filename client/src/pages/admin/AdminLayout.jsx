import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.classList.contains("hamburger-icon")
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  return (
    <div className="admin-layout">
      {/* Hamburger only visible on mobile */}
      <button className="hamburger-icon" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/appointments">Appointments</Link>
            </li>
            <li>
              <Link to="/admin/therapists">Therapists</Link>
            </li>
            <li>
              <Link to="/admin/services">Services</Link>
            </li>
            <li>
              <Link to="/admin/treatments">Treatments</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/contacts">Contact Queries</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
