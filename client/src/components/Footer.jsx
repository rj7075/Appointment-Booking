import React from "react";
import "./Footer.css";
import logo from "../assets/Phy_logo.png";
import { BiPhoneCall } from "react-icons/bi";
import { PiMapPinLineBold } from "react-icons/pi";
import { Link } from "react-router-dom";

import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsWhatsapp,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <img src={logo} alt="PhysioWell" className="footer-logo" />
          <p>
            PhysioWell provides personalized home care services, including
            nursing, physiotherapy, and occupational therapy, to enhance your
            health and well-being.
          </p>
          <div className="social-icons">
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsYoutube />
            <BsWhatsapp />
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Our Services</Link>
            </li>
            <li>
              <Link to="/therapists">Our Doctors</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Departments</h4>
          <ul>
            <li>Cardiology</li>
            <li>Dental Care</li>
            <li>Endocrinology</li>
            <li>Eye Care</li>
            <li>Neurology</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Policies</h4>
          <ul>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Refund</li>
            <li>Terms of Service</li>
            <li>Disclaimer</li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h4>Contact Info</h4>
          <p>
            <BiPhoneCall /> Need Help? 24/7
            <br />
            <strong>+91 9838692186</strong>
          </p>
          <p>
            <PiMapPinLineBold /> PhysioWell, Gurugram,
            <br />
            Gurgram Sector 66 Golf Course Exns. Road
          </p>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>
          @ 2024 Ranjeet Yadav. All rights reserved cretaed by: Ranjeet Yadav
        </p>
        <div className="footer-links">
          <span>Privacy Policy</span> | <span>Terms & Conditions</span>
        </div>
        <a href="#top" className="scroll-top">
          ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
