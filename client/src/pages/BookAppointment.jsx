import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookAppointment.css";
const BookAppointment = () => {
  const [treatments, setTreatments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    treatment: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [services, setServices] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserAndTreatments = async () => {
      try {
        const treatRes = await axios.get(
          "https://appointment-booking-backend-mw2h.onrender.com/api/treatments"
        );
        setTreatments(treatRes.data);

        const serviceRes = await axios.get(
          "http://localhost:5000/api/services"
        );
        setServices(serviceRes.data);

        const token = localStorage.getItem("token");
        const userRes = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData((prev) => ({
          ...prev,
          name: userRes.data.name,
          email: userRes.data.email,
        }));
      } catch (err) {
        console.error("Error fetching services/treatments", err);
      }
    };

    fetchUserAndTreatments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token)
      return setStatus({ type: "error", msg: "Please log in first." });

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/appointments/book",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus({ type: "success", msg: "Appointment booked successfully!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        treatment: "",
        service: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Failed to book appointment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Book Appointment</h2>

      {status && (
        <div
          className={`alert alert-${
            status.type === "success" ? "success" : "danger"
          }`}
        >
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name *</label>
          <input
            name="name"
            className="form-control"
            placeholder="Login/Register first"
            required
            value={formData.name}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Email *</label>
          <input
            type="email"
            placeholder="Login/Register first"
            name="email"
            className="form-control"
            required
            value={formData.email}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Phone *</label>
          <input
            name="phone"
            className="form-control"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            className="form-control"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Time</label>
          <input
            type="time"
            name="time"
            className="form-control"
            required
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Treatment *</label>
          <select
            name="treatment"
            className="form-control"
            required
            value={formData.treatmentId}
            onChange={handleChange}
          >
            <option value="">-- Select Treatment --</option>
            {treatments.map((t) => (
              <option key={t.index} value={t._title}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Service *</label>
          <select
            name="service"
            className="form-control"
            required
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">-- Select Service --</option>
            {services.map((st) => (
              <option key={st.index} value={st.title}>
                {st.title}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
