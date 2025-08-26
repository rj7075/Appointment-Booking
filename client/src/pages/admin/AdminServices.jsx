import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "https://appointment-booking-backend-mw2h.onrender.com/api/services"
      );
      setServices(res.data);
      toast.success("Services Fetched Successfully")
    } catch (err) {
      toast.error("Failed to fetch Servies")
      console.error("Failed to fetch services", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (editingId) {
        await axios.put(
          `https://appointment-booking-backend-mw2h.onrender.com/api/services/${editingId}`,
          formData,
          config
        );
      } else {
        await axios.post(
          "https://appointment-booking-backend-mw2h.onrender.com/api/services",
          formData,
          config
        );
      }

      fetchServices();
      setFormData({ title: "", description: "", image: "" });
      setEditingId(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error saving service");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image,
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      await axios.delete(
        `https://appointment-booking-backend-mw2h.onrender.com/api/services/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchServices();
      
    } catch (err) {
      toast.error("Failed to Fetch Services");
      
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Manage Services</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Title *</label>
          <input
            name="title"
            className="form-control"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Description *</label>
          <textarea
            name="description"
            className="form-control"
            required
            rows="3"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Image URL *</label>
          <input
            name="image"
            className="form-control"
            required
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <h4 className="mb-3">All Services</h4>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card h-100">
              <img
                src={service.image}
                className="card-img-top"
                alt={service.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <button
                  onClick={() => handleEdit(service)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
