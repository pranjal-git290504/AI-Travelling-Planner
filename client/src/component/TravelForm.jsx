import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Plane,
} from "lucide-react";
import "../style/TravelForm.css";
import { generateItinerary } from "../api/geminiService"; // Import the Gemini service

const TravelForm = ({ addTrip, navigateToTrip, trips, updateTrip }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialFormData = {
    destination: { city: "", country: "", coordinates: [] },
    dates: { startDate: "", endDate: "" },
    preferences: { travelStyle: "", budget: "", interests: [], duration: 0 },
    itinerary: {
      days: [],
    },
    // Add a placeholder for thumbnailUrl for new trips
    thumbnailUrl:
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    localInfo: { language: "", currency: "", emergencyNumber: "" },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isGenerating, setIsGenerating] = useState(false); // New state for loading indicator
  const [generationError, setGenerationError] = useState(null); // New state for errors

  useEffect(() => {
    if (id && trips) {
      const tripToEdit = trips.find((trip) => trip.id === id);
      console.log("Trip to edit found:", tripToEdit); // Debugging line
      if (tripToEdit) {
        // Merge existing trip data with initial form data to ensure all fields are present
        setFormData((prevFormData) => {
          const newFormData = {
            ...prevFormData,
            ...tripToEdit,
            destination: {
              ...prevFormData.destination,
              ...(tripToEdit.destination || {}),
            },
            dates: { ...prevFormData.dates, ...(tripToEdit.dates || {}) },
            preferences: {
              ...prevFormData.preferences,
              ...(tripToEdit.preferences || {}),
            },
            localInfo: {
              ...prevFormData.localInfo,
              ...(tripToEdit.localInfo || {}),
            },
            itinerary: {
              ...prevFormData.itinerary,
              ...(tripToEdit.itinerary || {}),
            },
          };
          console.log("New form data after merge:", newFormData); // Debugging line
          return newFormData;
        });
      } else {
        // If trip not found, reset to initial form data
        setFormData(initialFormData);
        console.log("Trip not found, resetting to initial form data."); // Debugging line
      }
    } else if (!id) {
      // If creating a new trip, ensure form is reset to initial data
      setFormData(initialFormData);
      console.log("No ID, creating new trip, resetting to initial form data."); // Debugging line
    }
  }, [id, trips]);

  useEffect(() => {
    calculateDuration();
  }, [formData.dates.startDate, formData.dates.endDate]);

  const handlePlaceSelect = (event) => {
    const place = event.detail.place;
    if (place) {
      // Try to extract only the city name from the address components
      let cityName = "";
      let countryName = "";
      // Prefer 'locality', fallback to 'administrative_area_level_2', then 'sublocality', then first word of place.name
      for (const component of place.address_components) {
        if (component.types.includes("locality")) {
          cityName = component.long_name;
        }
        if (component.types.includes("country")) {
          countryName = component.long_name;
        }
      }
      // If cityName is still empty, fallback to administrative_area_level_1 (for cities like Jaipur)
      if (!cityName) {
        for (const component of place.address_components) {
          if (component.types.includes("administrative_area_level_1")) {
            cityName = component.long_name;
          }
        }
      }
      if (!cityName) {
        for (const component of place.address_components) {
          if (component.types.includes("administrative_area_level_2")) {
            cityName = component.long_name;
          }
        }
      }
      if (!cityName) {
        for (const component of place.address_components) {
          if (component.types.includes("sublocality")) {
            cityName = component.long_name;
          }
        }
      }
      if (!cityName && place.name) {
        // If place.name is a comma-separated string, take only the first part
        cityName = place.name.split(",")[0].trim();
      }
      setFormData((prev) => ({
        ...prev,
        destination: {
          ...prev.destination,
          city: cityName,
          country: countryName,
        },
      }));
      // --- Force the autocomplete input to show only the city name ---
      if (autocompleteRef.current) {
        const shadowInput =
          autocompleteRef.current.shadowRoot?.querySelector("input");
        if (shadowInput) {
          shadowInput.value = cityName;
          shadowInput.style.background = "#fff";
          shadowInput.style.color = "#2563eb";
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        destination: { ...prev.destination, city: "", country: "" },
      }));
    }
  };
  // --- END NEW: Google Places API loading and PlaceAutocompleteElement setup ---

  const budgetOptions = [
    { value: "budget", label: "Budget ($-$$)", icon: "💰" },
    { value: "mid-range", label: "Mid-range ($$$)", icon: "💵" },
    { value: "luxury", label: "Luxury ($$$$)", icon: "💎" },
  ];

  const interestOptions = [
    { value: "culture", label: "Culture & History", icon: "🏛️" },
    { value: "food", label: "Food & Dining", icon: "🍴" },
    { value: "nature", label: "Nature & Outdoor", icon: "🌲" },
    { value: "adventure", label: "Adventure Sports", icon: "🏔️" },
    { value: "nightlife", label: "Nightlife & Entertainment", icon: "🎭" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "relaxation", label: "Relaxation & Spa", icon: "🧘" },
    { value: "photography", label: "Photography", icon: "📸" },
  ];

  const travelStyles = [
    { value: "solo", label: "Solo Travel", icon: "🎒" },
    { value: "couple", label: "Couple", icon: "💑" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { value: "friends", label: "Friends Group", icon: "👥" },
    { value: "business", label: "Business", icon: "💼" },
  ];

  const handleInputChange = (field, value, nested = null) => {
    setFormData((prev) => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested],
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        interests: prev.preferences.interests.includes(interest)
          ? prev.preferences.interests.filter((i) => i !== interest)
          : [...prev.preferences.interests, interest],
      },
    }));
  };

  const handleSubmit = async (e) => {
    // Make handleSubmit async
    e.preventDefault();
    setGenerationError(null); // Clear previous errors

    if (id) {
      // If ID exists, it's an edit operation
      updateTrip(formData);
      navigateToTrip(id);
      alert("Trip updated successfully!");
    } else {
      // If no ID, it's a new trip creation
      try {
        setIsGenerating(true); // Start loading
        alert("Generating your itinerary. This might take a moment...");

        // --- ADD THESE CONSOLE LOGS ---
        console.log(
          "handleSubmit - formData.dates.startDate:",
          formData.dates.startDate
        );
        console.log(
          "handleSubmit - formData.dates.endDate:",
          formData.dates.endDate
        );
        console.log(
          "handleSubmit - formData.preferences.duration:",
          formData.preferences.duration
        );
        // --- END ADDITION ---

        const generatedItinerary = await generateItinerary(formData); // Call Gemini AI
        console.log("Generated Itinerary:", generatedItinerary);

        // Update formData with the generated itinerary
        const tripWithItinerary = {
          ...formData,
          itinerary: generatedItinerary.days,
          duration: formData.preferences.duration, // <-- add this line
        };

        console.log("Trip to submit:", tripWithItinerary);
        const newTripId = await addTrip(tripWithItinerary); // Await addTrip
        navigateToTrip(newTripId);
        alert("Itinerary generated and trip created successfully!");
      } catch (error) {
        console.error(
          "Error during itinerary generation or trip creation:",
          error
        );
        setGenerationError(
          "Failed to generate itinerary. Please try again. " + error.message
        );
        alert("Failed to generate itinerary. Check console for details.");
      } finally {
        setIsGenerating(false); // End loading
      }
    }
  };

  function parseYYYYMMDD(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  // const start = new parseYYYYMMDD(startDate);
  // const end = new parseYYYYMMDD(endDate);

  const calculateDuration = () => {
    const { startDate, endDate } = formData.dates;

    // --- ADD THESE CONSOLE LOGS ---
    console.log("calculateDuration - Raw startDate from state:", startDate);
    console.log("calculateDuration - Raw endDate from state:", endDate);
    // --- END ADDITION ---

    if (startDate && endDate) {
      // Handles both YYYY-MM-DD and MM/DD/YYYY
      let start, end;
      if (startDate.includes("-")) {
        // YYYY-MM-DD
        const [year, month, day] = startDate.split("-").map(Number);
        start = new Date(year, month - 1, day);
      } else if (startDate.includes("/")) {
        // MM/DD/YYYY
        const [month, day, year] = startDate.split("/").map(Number);
        start = new Date(year, month - 1, day);
      }
      if (endDate.includes("-")) {
        const [year, month, day] = endDate.split("-").map(Number);
        end = new Date(year, month - 1, day);
      } else if (endDate.includes("/")) {
        const [month, day, year] = endDate.split("/").map(Number);
        end = new Date(year, month - 1, day);
      }
      const diffTime = end - start;
      if (diffTime >= 0) {
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive

        // --- ADD THIS CONSOLE LOG ---
        console.log("calculateDuration - Calculated diffDays:", diffDays);
        // --- END ADDITION ---

        handleInputChange("duration", diffDays, "preferences");
      } else {
        handleInputChange("duration", 0, "preferences");
      }
    }
  };

  return (
    <div className="travel-form-wrapper">
      <div className="travel-form-card">
        <div className="form-header">
          <h2 className="form-title">Plan Your Perfect Trip</h2>
          <p className="form-subtitle">
            Let AI create a personalized itinerary just for you
          </p>
        </div>

        {/* Destination */}
        <div className="form-section">
          <div className="form-section-header">
            <MapPin className="form-icon" />
            <h3>Destination</h3>
          </div>
          <div className="grid grid-2">
            <div>
              <label className="form-label">City</label>
              <input
                type="text"
                value={formData.destination.city}
                onChange={(e) =>
                  handleInputChange("city", e.target.value, "destination")
                }
                placeholder="Enter city"
                style={{ background: "#fff", color: "#2563eb" }}
              />
            </div>
            <div>
              <label className="form-label">Country</label>
              <input
                type="text"
                value={formData.destination.country}
                onChange={(e) =>
                  handleInputChange("country", e.target.value, "destination")
                }
                placeholder="Enter country"
                style={{ background: "#fff", color: "#2563eb" }}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="form-section">
            <div className="form-section-header">
              <Calendar className="form-icon" />
              <h3>Dates</h3>
            </div>
            <div className="grid grid-2">
              <div>
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  value={formData.dates.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value, "dates")
                  }
                  onBlur={calculateDuration}
                />
              </div>
              <div>
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  value={formData.dates.endDate}
                  onChange={(e) =>
                    handleInputChange("endDate", e.target.value, "dates")
                  }
                  onBlur={calculateDuration}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="form-section">
            <div className="form-section-header">
              <Users className="form-icon" />
              <h3>Preferences</h3>
            </div>
            <div className="form-field">
              <label className="form-label">Travel Style</label>
              <div className="tag-selector">
                {travelStyles.map((style) => (
                  <button
                    key={style.value}
                    type="button"
                    className={`tag-button ${
                      formData.preferences.travelStyle === style.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleInputChange(
                        "travelStyle",
                        style.value,
                        "preferences"
                      )
                    }
                  >
                    {style.icon} {style.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Budget</label>
              <div className="tag-selector">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.value}
                    type="button"
                    className={`tag-button ${
                      formData.preferences.budget === budget.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleInputChange("budget", budget.value, "preferences")
                    }
                  >
                    {budget.icon} {budget.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">
                Interests (select all that apply)
              </label>
              <div className="tag-selector-grid">
                {interestOptions.map((interest) => (
                  <button
                    key={interest.value}
                    type="button"
                    className={`tag-button ${
                      formData.preferences.interests.includes(interest.value)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleInterestToggle(interest.value)}
                  >
                    {interest.icon} {interest.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Duration (days)</label>
              <input
                type="number"
                value={formData.preferences.duration}
                onChange={(e) =>
                  handleInputChange(
                    "duration",
                    parseInt(e.target.value),
                    "preferences"
                  )
                }
                min="1"
                readOnly // Make duration read-only as it's calculated
              />
            </div>
          </div>

          <button type="submit" className="plan-button" onClick={handleSubmit}>
            Generate My Itinerary
            <Plane className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelForm;
