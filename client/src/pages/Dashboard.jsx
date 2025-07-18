import React, { useState, useEffect } from "react";
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Globe,
  Users,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Map,
  LogOut,
} from "lucide-react";
import "../style/Dashboard.css";
// Import placeholder images directly
import tripPlaceholder from "../assets/trip-placeholder.svg";
// Fallback if that doesn't work
import reactLogo from "../assets/react.svg";

const Dashboard = ({
  onCreateTrip,
  onViewTrip,
  onEditTrip,
  onDeleteTrip,
  trips,
  currentUser,
  onLogout,
  adminButton,
}) => {
  // Prevent rendering if not logged in
  if (!currentUser) {
    return (
      <div
        className="dashboard-root"
        style={{ textAlign: "center", paddingTop: "10%" }}
      >
        <p>You must be logged in to view your dashboard.</p>
      </div>
    );
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const loadTrips = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    loadTrips();
  }, [trips]);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || trip.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt) - new Date(b.createdAt);
      case "upcoming":
        return new Date(a.dates.startDate) - new Date(b.dates.startDate);
      case "alphabetical":
        return a.destination.city.localeCompare(b.destination.city);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="dashboard-root">
        <div style={{ textAlign: "center", paddingTop: "10%" }}>
          <div className="spinner" />
          <p>Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-title">
              {currentUser
                ? `${currentUser.username}'s Travel Dashboard`
                : "My Travel Dashboard"}
            </h1>
            <p className="dashboard-subtitle">
              Manage and explore your trip collection
            </p>
          </div>
          <div className="dashboard-actions">
            <button className="plan-trip-button" onClick={onCreateTrip}>
              <Plus /> Plan New Trip
            </button>
            {currentUser && (
              <button
                className="logout-button"
                onClick={onLogout}
                style={{ marginLeft: "1rem" }}
              >
                <LogOut /> Logout
              </button>
            )}
            {/* Render admin button if provided */}
            {adminButton}
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-header">
              <div>
                <p>Total Trips</p>
                <p>{trips.length}</p>
              </div>
              <div className="status-icon">
                <Plane />
              </div>
            </div>
          </div>
        </div>
        <div className="search-filter-bar">
          <div className="search-filter-content">
            <div style={{ flex: 1, position: "relative" }}>
              <Search className="search-icon" />
              <input
                className="search-input"
                type="text"
                placeholder="Search trips by destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="recent">Most Recent</option>
              <option value="upcoming">Upcoming First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
        <div className="trip-grid">
          {sortedTrips.map((trip) => (
            <div key={trip.id} className="trip-card">
              <div className="trip-card-body">
                <div className="trip-header">
                  <div className="trip-destination">
                    <img
                      src={trip.thumbnailUrl}
                      alt={trip.destination.city}
                      className="trip-thumbnail-image"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = tripPlaceholder; // Use imported placeholder image
                        // If that fails, try React logo as a last resort
                        e.target.onerror = () => {
                          e.target.src = reactLogo;
                        };
                      }}
                    />
                    <div>
                      <h3 className="trip-title">{trip.destination.city}</h3>
                      <p className="trip-country">{trip.destination.country}</p>
                    </div>
                  </div>
                  <div className={`trip-status status-${trip.status}`}>
                    {trip.status}
                  </div>
                </div>
                <div className="trip-details">
                  <p>
                    <Calendar /> {trip.dates.startDate} - {trip.dates.endDate}
                  </p>
                  <p>
                    <Clock /> {trip.duration} days
                  </p>
                  <p>{trip.budget}</p>
                </div>
                <div className="trip-stats">
                  <span>{trip.activities} activities</span>
                  <span>{trip.favorites} favorites</span>
                </div>
                <div className="trip-tags">
                  {trip.preferences.interests?.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag">
                      {tag}
                    </span>
                  ))}
                  {trip.preferences.interests?.length > 3 && (
                    <span className="tag extra-tag">
                      +{trip.preferences.interests.length - 3}
                    </span>
                  )}
                </div>
                <div className="trip-buttons">
                  <button
                    className="trip-button"
                    onClick={() => onViewTrip(trip.id)}
                  >
                    <Eye /> View
                  </button>
                  <button
                    className="trip-button trip-button-edit"
                    onClick={() => onEditTrip(trip.id)}
                  >
                    <Edit3 />
                  </button>
                  <button
                    className="trip-button trip-button-delete"
                    onClick={() => onDeleteTrip(trip.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
