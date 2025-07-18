import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/TripDetails.css";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Users,
  Utensils,
  Bed,
  Heart,
  Download,
  Share,
  Edit3,
  Map,
  CheckCircle,
  Info,
} from "lucide-react";
import ItineraryDisplay from "../component/ItineraryDisplay";

const TripDetails = ({ trips = [] }) => {
  // Now accepting 'trips' prop
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [favorites, setFavorites] = useState(new Set());
  const [completed, setCompleted] = useState(new Set());

  useEffect(() => {
    const fetchTripDetails = async () => {
      setLoading(true);
      // Simulate API call (or just direct data access from props)
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundTrip = Array.isArray(trips)
        ? trips.find((t) => String(t.id) === id)
        : null;
      setTrip(foundTrip);
      setLoading(false);

      if (foundTrip && foundTrip.itinerary) {
        const initialFavorites = new Set();
        const initialCompleted = new Set();
        // Ensure foundTrip.itinerary is an array before calling forEach
        if (Array.isArray(foundTrip.itinerary)) {
          foundTrip.itinerary.forEach((day) => {
            // Ensure day.activities is an array before iterating
            if (Array.isArray(day.activities)) {
              day.activities.forEach((activity) => {
                if (activity.status === "completed") {
                  initialCompleted.add(activity.id);
                }
              });
            }
          });
        }
        setFavorites(initialFavorites);
        setCompleted(initialCompleted);
      }
    };

    if (id && trips.length > 0) {
      // Ensure trips data is available
      fetchTripDetails();
    } else if (!id) {
      setLoading(false); // No ID, so no trip to load
    }
  }, [id, trips]); // Depend on both ID and the trips array

  const toggleFavorite = (activityId) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const toggleCompleted = (activityId) => {
    setCompleted((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  const toggleChecklistItem = (itemId) => {
    setTrip((prevTrip) => {
      // Check if checklist exists and is an array
      if (!prevTrip.checklist || !Array.isArray(prevTrip.checklist)) {
        // If checklist doesn't exist, initialize it with the new item
        return { ...prevTrip, checklist: [] };
      }

      const updatedChecklist = prevTrip.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      return { ...prevTrip, checklist: updatedChecklist };
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "landmark":
        return MapPin;
      case "culture":
        return Star;
      case "food":
        return Utensils;
      case "accommodation":
        return Bed;
      default:
        return MapPin;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "planned":
        return "status-planned";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      case "draft":
        return "status-draft";
      default:
        return "status-default";
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Star },
    { id: "itinerary", label: "Itinerary", icon: MapPin },
    { id: "checklist", label: "Checklist", icon: CheckCircle },
  ];

  if (loading) {
    return (
      <div className="trip-details-loading">
        <div className="spinner" />
        <p>Loading trip details...</p>
      </div>
    );
  }

  if (!trip) {
    return <div className="trip-details-error">Trip not found.</div>;
  }

  return (
    <div className="trip-details-root">
      <div className="trip-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <div className="trip-title-section">
          <h1>
            {trip.destination.city}, {trip.destination.country}
          </h1>
          <div className="trip-meta">
            <div>
              <Calendar /> {trip.dates?.startDate} - {trip.dates?.endDate}
            </div>
            <div>
              <Clock /> {trip.preferences?.duration} days
            </div>
            <div>
              <Users /> {trip.preferences?.travelStyle}
            </div>
          </div>
        </div>
        <div className="trip-actions">
          <button onClick={() => navigate(`/edit-trip/${trip.id}`)}>
            <Edit3 /> Edit
          </button>
          <button>
            <Share />
          </button>
          <button>
            <Download />
          </button>
        </div>
      </div>

      <div className="trip-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>

      <div className="trip-tab-content">
        {activeTab === "overview" && (
          <div className="trip-overview">
            <div className="overview-card">
              <h2>Overview</h2>
              <div>
                <MapPin /> {trip.destination?.city}, {trip.destination?.country}
              </div>
              <div>
                <Calendar /> {trip.dates?.startDate} - {trip.dates?.endDate}
              </div>
              <div>
                <DollarSign /> {trip.preferences?.budget}
              </div>
              <div>
                <Star /> {trip.preferences?.interests.join(", ")}
              </div>
              <div>
                <Bed /> {trip.preferences?.travelStyle}
              </div>
              <p>{trip.notes}</p>
            </div>

            <div className="local-info-card">
              <h2>Local Info</h2>
              <div>
                <Map /> Timezone: {trip.destination?.timezone}
              </div>
              <div>
                {/* <DollarSign /> Currency: {trip.localInfo.currency} */}
                <DollarSign /> Currency: {trip.localInfo?.currency || "N/A"}
              </div>
            </div>
          </div>
        )}

        {activeTab === "itinerary" && (
          <div className="trip-itinerary">
            <ItineraryDisplay
              itinerary={trip.itinerary}
              tripData={trip}
              onEdit={() => navigate(`/edit-trip/${trip.id}`)}
              onSave={() => alert("Save functionality will be implemented")}
              onShare={() => alert("Share functionality will be implemented")}
            />
          </div>
        )}

        {activeTab === "checklist" && (
          <div className="trip-checklist">
            <h2>Trip Checklist</h2>
            {trip.checklist &&
            Array.isArray(trip.checklist) &&
            trip.checklist.length > 0 ? (
              <ul>
                {trip.checklist.map((item) => (
                  <li
                    key={item.id}
                    className={item.completed ? "completed" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklistItem(item.id)}
                    />
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No checklist items available for this trip. Try adding some
                items!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
