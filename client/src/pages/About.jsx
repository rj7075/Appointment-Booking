import React from "react";
import "./About.css";
import TherapistSection from "./Therapists";
const About = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <h2>About PhysioWell</h2>
        <p>
          At PhysioWell, we are dedicated to providing expert physiotherapy care
          tailored to your needs. Our experienced team of therapists combines
          personalized treatment plans with modern techniques to help you
          recover faster, move better, and live pain-free.
        </p>
        <p>
          Whether you're recovering from an injury or managing chronic pain,
          we’re here to support your journey to better health and mobility.
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://thumbs.dreamstime.com/z/young-team-group-doctors-37813851.jpg"
          alt="PhysioWell Team"
        />
      </div>
      <TherapistSection />
    </div>
  );
};

export default About;
