import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Therapists.css";

const TherapistSection = () => {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/therapists");
        setTherapists(res.data);
      } catch (err) {
        console.error("Failed to fetch therapists", err);
      }
    };

    fetchTherapists();
  }, []);

  return (
    <div className="therapist-section container py-5">
      <h2 className="text-center mb-4">
        Meet Our <span>Doctors</span>
      </h2>
      <div className="row">
        {therapists.map((therapist) => (
          <div className="col-md-4 mb-4" key={therapist._id}>
            <div className="therapist-card card h-100">
              <img
                src={therapist.image || "https://via.placeholder.com/300x200"}
                alt={therapist.name}
                className="card-img-top therapist-img h-100"
              />
              <div className="card-body">
                <h5 className="card-title">{therapist.name}</h5>
                <p className="card-text">{therapist.specialization}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistSection;
