
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import { Collapse } from "bootstrap";
import logo from "../assets/Phy_logo.png";
import {toast} from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const collapseRef = useRef(null);

  const handleLinkClick = () => {
    const collapseElement = collapseRef.current;
    if (collapseElement?.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse.getInstance(collapseElement);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault(); // prevent navigation
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3 sticky-top">
      <Link className="navbar-brand ms-5" to="/" onClick={handleLinkClick}>
        <img src={logo} alt="PhysioWell Logo" />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => {
          const collapseElement = collapseRef.current;
          const bsCollapse =
            window.bootstrap.Collapse.getOrCreateInstance(collapseElement);
          bsCollapse.toggle(); 
        }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse"
        id="navbarNav"
        ref={collapseRef}
      >
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/book" onClick={handleLinkClick}>
              Appointment
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pricing" onClick={handleLinkClick}>
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services" onClick={handleLinkClick}>
              Services
            </Link>
          </li>

          {user?.role === "admin" && (
            <li className="nav-item text-primary">
              <Link className="nav-link" to="/admin" onClick={handleLinkClick}>
                <h4 className="text-primary">DashBoard</h4>
              </Link>
            </li>
          )}

          {!token ? (
            <li className="nav-item dropdown" ref={dropdownRef}>
              <Link
                to="#"
                className={`nav-link dropdown-toggle ${
                  dropdownOpen ? "show" : ""
                }`}
                id="loginDropdown"
                role="button"
                aria-expanded={dropdownOpen ? "true" : "false"}
                onClick={toggleDropdown}
              >
                <i className="bi bi-person-circle me-1"></i> Login
              </Link>

              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  dropdownOpen ? "show" : ""
                }`}
                aria-labelledby="loginDropdown"
              >
                <li onClick={handleLinkClick}>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                  >
                    User Login
                  </Link>
                </li>
                <li onClick={handleLinkClick}>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={() => {
                    handleLogout();
                    handleLinkClick(); // close menu on logout
                  }}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item">
                <span className="nav-link">
                  Welcome, <strong>{user?.name || "User"}</strong>
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
