import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import TravelForm from "./component/TravelForm";
import TripDetails from "./pages/TripDetails";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./component/ProtectedRoute";
import { tripService, authService } from "./api";

function App() {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Initialize current user from localStorage on mount, including isAdmin
  useEffect(() => {
    const storedUserId = localStorage.getItem("currentUserId");
    const storedUsername = localStorage.getItem("currentUsername");
    const storedIsAdmin = localStorage.getItem("currentUserIsAdmin") === "true";
    if (storedUserId && storedUsername) {
      setCurrentUser({
        id: storedUserId,
        username: storedUsername,
        isAdmin: storedIsAdmin,
      });
    }
  }, []);

  // Fetch trips from the backend when the component mounts or user changes
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await tripService.getAllTrips();
        setTrips(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching trips:", err);
        setError("Failed to load trips. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    // Only fetch trips if a user is logged in
    if (currentUser) {
      fetchTrips();
    } else {
      setTrips([]); // Clear trips when logged out
    }
  }, [currentUser]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsLoggingOut(true); // Indicate that a logout is in progress
    // The rest of the logout logic will be handled by the useEffect
  };

  // New useEffect to handle logout actions after isLoggingOut is set
  useEffect(() => {
    if (isLoggingOut) {
      authService.logout(); // Call mock logout to clear localStorage
      setCurrentUser(null);
      navigate("/"); // Redirect to home page after logout
      // We will NOT set setIsLoggingOut(false) here. It will reset naturally on route change.
    }
  }, [isLoggingOut, navigate]); // Depend on isLoggingOut and navigate

  const addTrip = async (newTrip) => {
    try {
      const addedTrip = await tripService.createTrip(newTrip);
      setTrips((prevTrips) => [...prevTrips, addedTrip]);
      return addedTrip.id; // Return the ID of the new trip from the backend
    } catch (err) {
      console.error("Error adding trip:", err);
      setError("Failed to add trip. Please try again.");
      throw err; // Re-throw to be handled by TravelForm if needed
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      const response = await tripService.updateTrip(
        updatedTrip.id,
        updatedTrip
      );
      setTrips((prevTrips) =>
        prevTrips.map((trip) => (trip.id === response.id ? response : trip))
      );
    } catch (err) {
      console.error("Error updating trip:", err);
      setError("Failed to update trip. Please try again.");
      throw err;
    }
  };

  const deleteTrip = async (id) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await tripService.deleteTrip(id);
        setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
        alert("Trip deleted successfully!");
      } catch (err) {
        console.error("Error deleting trip:", err);
        setError("Failed to delete trip. Please try again.");
      }
    }
  };

  const handleCreateTrip = () => {
    navigate("/create-trip");
  };

  const handleViewTrip = (id) => {
    navigate(`/trip/${id}`);
  };

  const handleEditTrip = (id) => {
    navigate(`/edit-trip/${id}`);
  };

  if (loading && currentUser) {
    return (
      <div style={{ textAlign: "center", paddingTop: "10%" }}>
        <div className="spinner" />
        <p>Loading application data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", paddingTop: "10%", color: "red" }}>
        <p>{error}</p>
        <p>Please check your backend server and network connection.</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            currentUser={currentUser}
            onPlanTrip={() => {
              if (currentUser) {
                navigate("/create-trip");
              } else {
                navigate("/login");
              }
            }}
          />
        }
      />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes: Only render if currentUser exists */}
      {currentUser && (
        <Route
          element={
            <ProtectedRoute
              currentUser={currentUser}
              isLoggingOut={isLoggingOut}
            />
          }
        >
          <Route
            path="/dashboard"
            element={
              <Dashboard
                onCreateTrip={handleCreateTrip}
                onViewTrip={handleViewTrip}
                onEditTrip={handleEditTrip}
                onDeleteTrip={deleteTrip}
                trips={trips}
                currentUser={currentUser}
                onLogout={handleLogout}
                // Add admin dashboard navigation for admins
                adminButton={
                  currentUser.isAdmin ? (
                    <button
                      style={{
                        margin: "1rem 0",
                        padding: "0.5rem 1rem",
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate("/admin")}
                    >
                      Go to Admin Dashboard
                    </button>
                  ) : null
                }
              />
            }
          />
          <Route
            path="/create-trip"
            element={
              <TravelForm addTrip={addTrip} navigateToTrip={handleViewTrip} />
            }
          />
          <Route path="/trip/:id" element={<TripDetails trips={trips} />} />
          <Route
            path="/edit-trip/:id"
            element={
              <TravelForm
                trips={trips}
                updateTrip={updateTrip}
                navigateToTrip={handleViewTrip}
              />
            }
          />
          {/* Admin dashboard route, only for admins */}
          {currentUser.isAdmin && (
            <Route
              path="/admin"
              element={<AdminDashboard currentUser={currentUser} />}
            />
          )}
        </Route>
      )}
    </Routes>
  );
}

export default App;
