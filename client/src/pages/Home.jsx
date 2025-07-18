import "../style/Home.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Star,
  Globe,
  Zap,
  Heart,
  Camera,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate
  // Get currentUser from props if passed by App.jsx
  const currentUser = props.currentUser;

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Planning",
      description:
        "Get personalized itineraries created by advanced AI in seconds",
    },
    {
      icon: MapPin,
      title: "Smart Recommendations",
      description:
        "Discover hidden gems and popular attractions tailored to your interests",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Easily adjust your itinerary and optimize your time",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Plan trips to destinations worldwide with local insights",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The AI planner created the perfect Tokyo itinerary for my honeymoon. Every recommendation was spot-on!",
      avatar: "🙋‍♀️",
    },
    {
      name: "Marcus Chen",
      location: "London, UK",
      rating: 5,
      text: "Saved me hours of research. The Barcelona trip was incredible - all thanks to this smart planner.",
      avatar: "🙋‍♂️",
    },
    {
      name: "Emma Rodriguez",
      location: "Sydney, Australia",
      rating: 5,
      text: "Love how it considered my budget and interests. The Paris itinerary was absolutely perfect!",
      avatar: "🙋‍♀️",
    },
  ];

  const popularDestinations = [
    {
      city: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
      trips: "2.3k",
    },
    {
      city: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trips: "3.1k",
    },
    {
      city: "London",
      country: "UK",
      image:
        "https://images.unsplash.com/photo-1494922275507-58dc039ed337?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bG9uZG9ufGVufDB8fDB8fHww",
      trips: "2.7k",
    },
    {
      city: "Bangkok",
      country: "Thailand",
      image:
        "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRoYWlsYW5kfGVlbnwwfDB8fHww",
      trips: "1.4k",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container">
        <div className="text-center mb-16">
          <h1>
            Your Perfect Trip,
            <span> AI-Planned</span>
          </h1>

          <p className="feature-description mb-8">
            Create personalized travel itineraries in seconds with our
            AI-powered planner. Just tell us your preferences, and we'll craft
            the perfect trip for you.
          </p>

          <div className="text-center">
            <button
              onClick={() => {
                if (currentUser) {
                  navigate("/create-trip");
                } else {
                  navigate("/login");
                }
              }}
              className="hero-button"
            >
              <Plane className="icon" />
              Plan My Trip
              <ArrowRight className="icon" />
            </button>
            {/* Existing button to navigate to Dashboard */}
            <button
              onClick={() => {
                if (currentUser) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
              className="hero-button secondary-button"
              style={{ marginLeft: "1rem" }}
            >
              View My Trips
              <ArrowRight className="icon" />
            </button>

            {/* New Login/Register Buttons */}
            <div className="auth-buttons" style={{ marginTop: "1rem" }}>
              <Link to="/login" className="hero-button secondary-button">
                Login
              </Link>
              <Link
                to="/register"
                className="hero-button secondary-button"
                style={{ marginLeft: "1rem" }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number stat-blue">50k+</div>
            <div className="stat-label">Trips Planned</div>
          </div>
          <div className="stat-item">
            <div className="stat-number stat-purple">200+</div>
            <div className="stat-label">Destinations</div>
          </div>
          <div className="stat-item">
            <div className="stat-number stat-green">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number stat-orange">24/7</div>
            <div className="stat-label">AI Support</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2>Why Choose Our AI Planner?</h2>
              <p className="feature-description">
                Experience the future of travel planning with intelligent
                recommendations and personalized itineraries
              </p>
            </div>

            <div className="grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <feature.icon className="icon" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Destinations Section */}
        <div className="destinations-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Popular Destinations</h2>
              <p className="section-subtitle">
                Discover where other travelers are planning their adventures
              </p>
            </div>

            <div className="destination-grid">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="destination-card">
                  <div className="destination-card-content">
                    <div className="destination-header">
                      <div className="destination-info">
                        {/* <div className="destination-image">{destination.image}</div> */}
                        <div className="destination-image">
                          <img src={destination.image} />
                        </div>

                        <div>
                          <h3 className="destination-city">
                            {destination.city}
                          </h3>
                          <p className="destination-country">
                            {destination.country}
                          </p>
                        </div>
                      </div>
                      <div className="destination-meta">
                        <div className="destination-meta-label">
                          Trips planned
                        </div>
                        <div className="destination-meta-value">
                          {destination.trips}
                        </div>
                      </div>
                    </div>

                    <button className="destination-button">
                      Plan Trip to {destination.city}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2>What Travelers Say</h2>
              <p className="feature-description">
                Real stories from real travelers who love our AI planner
              </p>
            </div>

            <div className="grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-location">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* it is for 5 star representation */}
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="icon"
                        style={{ color: "#facc15", fill: "#facc15" }}
                      />
                    ))}
                  </div>

                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="container cta-content">
            <h2 className="cta-heading">Ready to Plan Your Dream Trip?</h2>
            <p className="cta-subtext">
              Join thousands of travelers who trust our AI to create
              unforgettable experiences
            </p>

            <div className="cta-buttons">
              <button
                onClick={() => {
                  if (currentUser) {
                    navigate("/create-trip");
                  } else {
                    navigate("/login");
                  }
                }}
                className="cta-button-primary"
              >
                <Plane className="icon" />
                Start Planning Now
              </button>

              <button className="cta-button-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
