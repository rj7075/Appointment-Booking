import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Services.css";

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://appointment-booking-server1.onrender.com/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-section container py-5">
      <h2 className="text-center mb-4">
        Our <span>Services</span>
      </h2>
      <div className="row">
        {services.length === 0 ? (
          <p className="text-center">No services available at the moment.</p>
        ) : (
          services.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card service-card h-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="card-img-top service-img"
                />
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServicesSection;
