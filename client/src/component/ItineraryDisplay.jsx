import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Users,
  Camera,
  Utensils,
  Bed,
  Navigation,
  Heart,
  Download,
  Share,
  Edit3,
} from "lucide-react";
import "../style/ItineraryDisplay.css";

const ItineraryDisplay = ({ itinerary, tripData, onEdit, onSave, onShare }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  // Corrected condition: itinerary itself is the array of days
  if (!itinerary || !Array.isArray(itinerary) || itinerary.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">
          Generating your personalized itinerary...
        </p>
      </div>
    );
  }

  const toggleFavorite = (activityId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(activityId)) {
        newFavorites.delete(activityId);
      } else {
        newFavorites.add(activityId);
      }
      return newFavorites;
    });
  };

  const getActivityIcon = (type) => {
    const icons = {
      restaurant: Utensils,
      attraction: Camera,
      hotel: Bed,
      transport: Navigation,
      activity: Star,
      default: MapPin,
    };
    return icons[type] || icons.default;
  };

  const getBudgetClass = (budget) => {
    return `budget-tag ${budget}`;
  };

  return (
    <div className="itinerary-container">
      {/* Overview */}
      <div className="overview-grid">
        <div className="overview-card">
          <div className="card-header">
            <DollarSign className="icon" />
            <h3>Budget</h3>
          </div>
          <div className={getBudgetClass(tripData?.preferences?.budget)}>
            {tripData?.preferences?.budget}
          </div>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <Star className="icon" />
            <h3>Interests</h3>
          </div>
          <div className="tag-list">
            {tripData?.preferences?.interests
              ?.slice(0, 3)
              .map((interest, i) => (
                <span className="tag" key={i}>
                  {interest}
                </span>
              ))}
            {tripData?.preferences?.interests?.length > 3 && (
              <span className="tag extra">
                +{tripData?.preferences?.interests?.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="overview-card">
          <div className="card-header">
            <MapPin className="icon" />
            <h3>Activities</h3>
          </div>
          <div className="activity-count">
            {itinerary?.reduce(
              (total, day) => total + (day.activities?.length || 0),
              0
            )}
          </div>
          <div className="activity-label">Total planned activities</div>
        </div>
      </div>

      {/* Day Switcher */}
      <div className="day-switcher">
        {itinerary.map((day, index) => (
          <button
            key={index}
            onClick={() => setActiveDay(index)}
            className={`day-button ${activeDay === index ? "active" : ""}`}
          >
            <div>
              <div>Day {index + 1}</div>
              <small>{new Date(day.date).toLocaleDateString()}</small>
            </div>
          </button>
        ))}
      </div>

      {/* Activities */}
      {itinerary?.[activeDay] && (
        <div className="day-details">
          <div className="day-details-header">
            <h2>
              Day {activeDay + 1} -{" "}
              {new Date(itinerary[activeDay].date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p>
              {itinerary[activeDay].activities?.length || 0} activities planned
            </p>
          </div>

          <div className="activity-list">
            {(itinerary[activeDay].activities || []).map((activity, index) => {
              const IconComponent = getActivityIcon(activity.type);
              const activityId = activity.id || `${activeDay}-${index}`;

              return (
                <div key={activityId} className="activity-card">
                  <div className="activity-icon">
                    <IconComponent className="icon" />
                  </div>
                  <div className="activity-content">
                    <div className="activity-top-row">
                      <div>
                        <h3>{activity.name}</h3>
                        <div className="activity-meta">
                          <span>
                            <Clock /> {activity.time}
                          </span>
                          <span>
                            <MapPin /> {activity.location}
                          </span>
                          {activity.duration && (
                            <span>{activity.duration}</span>
                          )}
                        </div>
                        <p>{activity.description}</p>
                        {activity.tips && (
                          <div className="activity-tip">
                            <strong>Tip:</strong> {activity.tips}
                          </div>
                        )}
                      </div>
                      <div className="activity-actions">
                        {activity.price && (
                          <div className="price-tag">{activity.price}</div>
                        )}
                        <button
                          className={`favorite-button ${
                            favorites.has(activityId) ? "favorited" : ""
                          }`}
                          onClick={() => toggleFavorite(activityId)}
                        >
                          <Heart className="icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="trip-summary">
        <h3>Trip Summary</h3>
        <div className="summary-grid">
          <div>
            <strong>Total Activities:</strong>{" "}
            {itinerary?.reduce(
              (total, day) => total + (day.activities?.length || 0),
              0
            )}
          </div>
          <div>
            <strong>Favorites:</strong> {favorites.size}
          </div>
          <div>
            <strong>Duration:</strong> {tripData?.preferences?.duration} days
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
