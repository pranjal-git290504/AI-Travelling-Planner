import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/AdminDashboard.css";

const AdminDashboard = ({ currentUser, token }) => {
  // Add navigation for back button
  const handleBack = () => {
    window.location.href = '/dashboard';
  };
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("users");

  // Helper: get auth token from localStorage if not passed
  const authToken = token || localStorage.getItem("authToken");

  useEffect(() => {
    if (!authToken) return;
    setLoading(true);
    const API_BASE_URL =
      import.meta.env.VITE_API_URL || "http://localhost:5000";
    const fetchData = async () => {
      try {
        const [usersRes, tripsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          axios.get(`${API_BASE_URL}/api/admin/trips`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
        console.log("Admin users API response:", usersRes.data);
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setTrips(Array.isArray(tripsRes.data) ? tripsRes.data : []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch admin data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authToken]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUsers(users.filter((u) => u._id !== id));
    } catch {
      alert("Failed to delete user.");
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await axios.delete(`/api/admin/trips/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setTrips(trips.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete trip.");
    }
  };

  if (!currentUser || !currentUser.isAdmin) {
    return (
      <div style={{ textAlign: "center", paddingTop: "10%" }}>
        Access denied: Admins only.
      </div>
    );
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", paddingTop: "10%" }}>
        Loading admin data...
      </div>
    );
  if (error)
    return (
      <div style={{ color: "red", textAlign: "center", paddingTop: "10%" }}>
        {error}
      </div>
    );

  return (
    <div className="admin-dashboard-root">
      <h1>Admin Dashboard</h1>
      <button
        style={{ marginBottom: 20, padding: '0.5rem 1rem', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={handleBack}
      >
        ← Back to Dashboard
      </button>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("users")} disabled={tab === "users"}>
          Manage Users
        </button>
        <button
          onClick={() => setTab("trips")}
          disabled={tab === "trips"}
          style={{ marginLeft: 10 }}
        >
          Manage Trips
        </button>
      </div>
      {tab === "users" && (
        <div>
          <h2>All Users</h2>
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", marginBottom: 30 }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={user._id === currentUser.id}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "trips" && (
        <div>
          <h2>All Trips</h2>
          <table border="1" cellPadding="8" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td>{trip._id}</td>
                  <td>
                    {trip.destination?.city}, {trip.destination?.country}
                  </td>
                  <td>{trip.user || "N/A"}</td>
                  <td>{trip.status}</td>
                  <td>
                    <button onClick={() => handleDeleteTrip(trip._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
