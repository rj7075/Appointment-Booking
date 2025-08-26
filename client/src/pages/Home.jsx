import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarouselSection from "../components/CarouselSection";
import TherapistSection from "./Therapists";
import ServicesSection from "./Services";
import TreatmentSection from "./Treatments";
import PricingSection from "./Pricing";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.shapo.io/widgets/display.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script); // clean up
    };
  }, []);

  return (
    <div>
      <CarouselSection />
      {/* Hero Section */}
      <section className="text-dark py-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome to <span>PhysioWell</span>
          </h1>
          <p className="lead">
            Empowering your body to heal, move, and thrive through expert care.
          </p>
        </div>
      </section>
      <ServicesSection />
      <TreatmentSection />
      <TherapistSection />
      <div className="bookAppointment text-center mt-5 mb-5">
        <button
          className="btn btn-primary btn-lg "
          onClick={() => navigate("/book")}
        >
          Book an Appointment
        </button>

        <button
          className="btn btn-secondary btn-lg "
          onClick={() => navigate("/contact")}
        >
          Contact us
        </button>
      </div>
      <PricingSection />
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-4">What Our Patients Say</h2>
          {/* Use the Shapo widget div below */}
          <div id="shapo-widget-3cabe4672b2773c9f54c"></div>
          <script
            id="shapo-embed-js"
            type="text/javascript"
            src="https://cdn.shapo.io/js/embed.js"
            defer
          ></script>
        </div>
      </section>
      {/* Why Choose Us */}

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Us</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <h4>✔ Certified Experts</h4>
              <p>
                Our therapists are licensed professionals with years of
                experience.
              </p>
            </div>
            <div className="col-md-4">
              <h4>✔ Personalized Care</h4>
              <p>We customize each treatment plan to meet your unique needs.</p>
            </div>
            <div className="col-md-4">
              <h4>✔ Advanced Techniques</h4>
              <p>
                We use modern physiotherapy tools and techniques for better
                results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
