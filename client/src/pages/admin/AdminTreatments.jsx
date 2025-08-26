import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTreatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    conditions: "",
    more: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchTreatments = async () => {
    try {
      const res = await axios.get(
        "https://appointment-booking-backend-mw2h.onrender.com/api/treatments"
      );
      setTreatments(res.data);
    } catch (err) {
      console.error("Failed to fetch treatments");
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (treatment) => {
    setFormData({
      title: treatment.title,
      conditions: treatment.conditions.join(", "),
      more: treatment.more,
      image: treatment.image,
    });
    setEditingId(treatment._id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this Treatment?")) return;
    try {
      await axios.delete(
        `https://appointment-booking-backend-mw2h.onrender.com/api/treatments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Deleted successfully!")
      setMessage("Deleted successfully!");
      fetchTreatments();
    } catch (err) {
      setMessage("Delete failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      conditions: formData.conditions.split(",").map((c) => c.trim()),
    };

    try {
      if (editingId) {
        await axios.put(
          `https://appointment-booking-backend-mw2h.onrender.com/api/treatments/${editingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage("Treatment updated!");
      } else {
        await axios.post(
          "https://appointment-booking-backend-mw2h.onrender.com/api/treatments",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage("Treatment added!");
      }
      setFormData({ title: "", conditions: "", more: "", image: "" });
      setEditingId(null);
      fetchTreatments();
    } catch (err) {
      setMessage("Operation failed.");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3">Manage Treatments</h3>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6 mb-2">
            <label>Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label>Conditions (comma-separated)</label>
            <input
              name="conditions"
              value={formData.conditions}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-2">
            <label>More (optional text)</label>
            <input
              name="more"
              value={formData.more}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          {editingId ? "Update Treatment" : "Add Treatment"}
        </button>
      </form>

      <h5>All Treatments</h5>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Conditions</th>
              <th>More</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {treatments.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>
                  <img src={t.image} alt="" width="80" />
                </td>
                <td>{t.conditions.join(", ")}</td>
                <td>{t.more}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTreatments;
