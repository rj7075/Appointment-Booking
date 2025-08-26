import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTherapists.css";

const AdminTherapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchTherapists = async () => {
    const res = await axios.get(
      "https://appointment-booking-backend-mw2h.onrender.com/api/therapists"
    );
    setTherapists(res.data);
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(
        `https://appointment-booking-backend-mw2h.onrender.com/api/therapists/${editId}`,
        formData
      );
    } else {
      await axios.post(
        "https://appointment-booking-backend-mw2h.onrender.com/api/therapists",
        formData
      );
    }
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      image: "",
      description: "",
    });
    setEditId(null);
    fetchTherapists();
  };

  const handleEdit = (therapist) => {
    setFormData(therapist);
    setEditId(therapist._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this Doctor?")) return;
    await axios.delete(
      `https://appointment-booking-backend-mw2h.onrender.com/api/therapists/${id}`
    );
    fetchTherapists();
  };

  return (
    <div className="admin-therapists">
      <h2>Admin Therapist Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
        <button type="submit">
          {editId ? "Update Therapist" : "Add Therapist"}
        </button>
      </form>

      <div className="therapist-grid">
        {therapists.map((t) => (
          <div key={t._id} className="therapist-card">
            <img src={t.image} alt={t.name} className="therapist-image" />
            <h3>{t.name}</h3>
            <p>
              <strong>Specialization:</strong> {t.specialization}
            </p>
            <p>
              <strong>Experience:</strong> {t.experience} years
            </p>
            <p>{t.description}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(t)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTherapists;
