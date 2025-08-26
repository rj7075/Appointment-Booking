import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CarouselSection.css";
const CarouselSection = () => {
  const carouselRef = useRef(null);
  useEffect(() => {
    if (carouselRef.current) {
      new window.bootstrap.Carousel(carouselRef.current, {
        interval: 5000,
        ride: "carousel",
      });
    }
  }, []);
  return (
    <section className="container-fluid px-0">
      <div
        id="treatmentCarousel"
        ref={carouselRef}
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#treatmentCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#treatmentCarousel"
            data-bs-slide-to="1"
            aria-current="true"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#treatmentCarousel"
            data-bs-slide-to="2"
            aria-current="true"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#treatmentCarousel"
            data-bs-slide-to="3"
            aria-current="true"
            aria-label="Slide 4"
          ></button>
        </div>

        {/* Carousel Items */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://raysphysio.com/wp-content/uploads/2020/12/banner.jpg"
              className="d-block w-100"
              alt="Physiotherapy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Expert Physiotherapy Care</h5>
              <p>
                Relieve pain and regain strength with our specialized
                treatments.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.S-duRXnrpjjh-0KSk0IbvgHaC7?r=0&rs=1&pid=ImgDetMain"
              className="d-block w-100"
              alt="Rehabilitation"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Rehabilitation Programs</h5>
              <p>Customized recovery plans to help you get back on track.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.OAq2e4EKCfqv-iiLdtnpNQHaDV?r=0&rs=1&pid=ImgDetMain"
              className="d-block w-100"
              alt="Physical Therapy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Personalized Physical Therapy</h5>
              <p>One-on-one sessions tailored to your health goals.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://posrehab.in/images/new-images/ortho-physiotherapy-banner.jpg"
              className="d-block w-100"
              alt="Physical Therapy"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Personalized Physical Therapy</h5>
              <p>One-on-one sessions tailored to your health goals.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#treatmentCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#treatmentCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
};

export default CarouselSection;
