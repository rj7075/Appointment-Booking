import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminAppointments.css";
const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleting ID:", id);
    if (!window.confirm("Are you sure to delete this appointment?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error("Failed to delete appointment", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="admin-appointments-container">
      <h2>Appointments</h2>

      <div className="overflow-x-auto">
        <table className="admin-appointments-table">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Patient Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Treatment</th>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td className="p-2 border">{a.userId?.name || "N/A"}</td>
                <td className="p-2 border">{a.userId?.email || "N/A"}</td>
                <td className="p-2 border">{a.phone || "N/A"}</td>
                <td className="p-2 border">
                  {new Date(a.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{a.time}</td>
                <td className="p-2 border">{a.treatment}</td>
                <td className="p-2 border">{a.service}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
