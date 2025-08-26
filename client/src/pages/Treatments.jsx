import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Treatments.css";

const TreatmentsSection = () => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await axios.get(
          "https://appointment-booking-backend-mw2h.onrender.com/api/treatments"
        ); 
        setTreatments(res.data);
      } catch (err) {
        console.error("Error fetching treatments", err);
      }
    };

    fetchTreatments();
  }, []);

  return (
    <div className="treatments-section container">
      <h2 className="text-center text-primary mb-4">
        <span className="text-muted">Excellence is Our Specialty</span>
        <br />
        <strong>
          Conditions <span className="highlight">We Treat</span>
        </strong>
      </h2>
      <div className="row">
        {treatments.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="treatment-card h-100">
              <img
                src={item.image}
                alt={item.title}
                className="treatment-img"
              />
              <div className="treatment-info">
                <h5>{item.title}</h5>
                <ul className="list-unstyled">
                  {item.conditions.map((cond, idx) => (
                    <li key={idx}>{cond}</li>
                  ))}
                  <li className="text-primary">{item.more}</li>
                  <li>
                    <a href="*" className="read-more">
                      Read more
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentsSection;
