import React from "react";
import "./Pricing.css";
import { useNavigate } from "react-router-dom";
const PricingSection = () => {
  const navigate = useNavigate();
  const plans = [
    {
      title: "Nurse Home Care Plan",
      price: "₹14999",
      features: [
        "Service offers 6Hrs to 24Hrs, ₹14,999–₹39,999",
        "Access To employers Hotline",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
    {
      title: "Physiotherapy Home Care Plan",
      price: "₹17999",
      features: [
        "First Session at ₹499",
        "Session Start From ₹800–₹1200",
        "15 Days Session From ₹700–₹1100",
        "30 Days Session From ₹600–₹1000",
        "Access To employers Hotline",
        "State and Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
    {
      title: "Occupational Therapy Home Care Plan",
      price: "₹20999",
      features: [
        "First Session at ₹499",
        "Session Start From ₹900–₹1300",
        "15 Days Session From ₹800–₹1200",
        "30 Days Session From ₹700–₹1100",
        "Access To employers Hotline",
        "State and Federal Postings",
        "24/7 Customer Support",
        "Safety Training Topics",
        "Free Equipment Use",
      ],
    },
  ];

  return (
    <div className="pricing-section">
      <h2 className="pricing-title">
        Choose the right pricing plan that suits your need
      </h2>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${index === 1 ? "highlight" : ""}`}
          >
            <h4>{plan.title}</h4>
            <p className="price">
              {plan.price}
              <span>/month</span>
            </p>
            <ul>
              {plan.features.map((item, idx) => (
                <li key={idx}>★ {item}</li>
              ))}
            </ul>
            <button className="buy-btn" onClick={() => navigate("/book")}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
