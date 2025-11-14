import "../style/Home.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Sparkles,
  TrendingUp,
  Compass,
  Lightbulb,
} from "lucide-react";

const Home = (props) => {
  const navigate = useNavigate();
  const currentUser = props.currentUser;
  const [activeDestination, setActiveDestination] = useState(0);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Planning",
      description:
        "Get personalized itineraries created by advanced AI in seconds",
      color: "#FF6B6B",
    },
    {
      icon: Compass,
      title: "Smart Recommendations",
      description:
        "Discover hidden gems and popular attractions tailored to your interests",
      color: "#4ECDC4",
    },
    {
      icon: Lightbulb,
      title: "Flexible Scheduling",
      description: "Easily adjust your itinerary and optimize your time",
      color: "#FFE66D",
    },
    {
      icon: TrendingUp,
      title: "Global Coverage",
      description: "Plan trips to destinations worldwide with local insights",
      color: "#95E1D3",
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
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600&auto=format&fit=crop&q=60",
      trips: "2.3k",
      vibe: "Romantic & Historic",
    },
    {
      city: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959375944-7049f642e9f1?w=600&auto=format&fit=crop&q=60",
      trips: "2.1k",
      vibe: "Modern & Traditional",
    },
    {
      city: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=600&auto=format&fit=crop&q=60",
      trips: "3.1k",
      vibe: "Urban & Energy",
    },
    {
      city: "London",
      country: "UK",
      image:
        "https://images.unsplash.com/photo-1494922275507-58dc039ed337?w=600&auto=format&fit=crop&q=60",
      trips: "2.7k",
      vibe: "Classic & Vibrant",
    },
  ];

  const stats = [
    { number: "50k+", label: "Adventures Created", icon: "✈️" },
    { number: "200+", label: "Destinations", icon: "🌍" },
    { number: "98%", label: "Happy Travelers", icon: "😊" },
  ];

  return (
    <div className="home-container">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section-new">
        <div className="hero-background">
          <div className="hero-blob hero-blob-1"></div>
          <div className="hero-blob hero-blob-2"></div>
          <div className="hero-blob hero-blob-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Sparkles size={16} />
              AI-Powered Travel Planning
            </div>
            <h1 className="hero-title">
              Your Journey,
              <br />
              <span className="gradient-text">Perfectly Planned</span>
            </h1>
            <p className="hero-description">
              Stop spending hours planning. Our AI understands your style,
              <br />
              budget, and dreams to create the trip you've always wanted.
            </p>

            <div className="hero-buttons-group">
              <button
                onClick={() =>
                  currentUser ? navigate("/create-trip") : navigate("/login")
                }
                className="btn-primary-new"
              >
                <Plane size={20} />
                Start Planning
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() =>
                  currentUser ? navigate("/dashboard") : navigate("/login")
                }
                className="btn-secondary-new"
              >
                <MapPin size={20} />
                View Trips
              </button>
            </div>

            <div className="hero-trust">
              <span>✨ Trusted by 50k+ travelers worldwide</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-wrapper">
              <div className="hero-card card-1">
                <div className="card-icon">📍</div>
                <div className="card-text">
                  <p className="card-label">Your Destination</p>
                  <p className="card-value">Paris</p>
                </div>
              </div>
              <div className="hero-card card-2">
                <div className="card-icon">📅</div>
                <div className="card-text">
                  <p className="card-label">Duration</p>
                  <p className="card-value">7 Days</p>
                </div>
              </div>
              <div className="hero-card card-3">
                <div className="card-icon">💰</div>
                <div className="card-text">
                  <p className="card-label">Budget</p>
                  <p className="card-value">$3,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section-new">
        <div className="container">
          <div className="stats-grid-new">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card-new">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header-new">
            <h2>How It Works</h2>
            <p>Three simple steps to your dream vacation</p>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">01</div>
              <div className="timeline-content">
                <h3>Tell Us Your Story</h3>
                <p>
                  Share your destination, dates, budget, and travel style. Our
                  AI learns what makes you tick.
                </p>
              </div>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-item timeline-item-right">
              <div className="timeline-number">02</div>
              <div className="timeline-content">
                <h3>AI Creates Magic</h3>
                <p>
                  Our intelligent system analyzes millions of possibilities to
                  craft your perfect itinerary.
                </p>
              </div>
            </div>

            <div className="timeline-connector"></div>

            <div className="timeline-item">
              <div className="timeline-number">03</div>
              <div className="timeline-content">
                <h3>Refine & Explore</h3>
                <p>
                  Customize, adjust timing, and discover hidden gems. Your trip,
                  your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section-new">
        <div className="container">
          <div className="section-header-new">
            <h2>Why Travelers Love Us</h2>
            <p>Designed for the modern explorer</p>
          </div>

          <div className="features-grid-new">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-new">
                <div className="feature-card-header">
                  <div
                    className="feature-icon-new"
                    style={{
                      backgroundColor: feature.color + "20",
                      color: feature.color,
                    }}
                  >
                    <feature.icon size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
                <div
                  className="feature-accent"
                  style={{ backgroundColor: feature.color }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DESTINATIONS ===== */}
      <section className="destinations-section-new">
        <div className="container">
          <div className="section-header-new">
            <h2>Explore Popular Destinations</h2>
            <p>Get inspired by where others are traveling</p>
          </div>

          <div className="destinations-showcase">
            {popularDestinations.map((destination, index) => (
              <div
                key={index}
                className={`destination-card-new ${
                  activeDestination === index ? "active" : ""
                }`}
                onMouseEnter={() => setActiveDestination(index)}
              >
                <div className="destination-image-container">
                  <img src={destination.image} alt={destination.city} />
                  <div className="destination-overlay"></div>
                </div>

                <div className="destination-info-new">
                  <div className="destination-header-new">
                    <div>
                      <h3>{destination.city}</h3>
                      <p className="destination-country">
                        {destination.country}
                      </p>
                      <p className="destination-vibe">{destination.vibe}</p>
                    </div>
                    <div className="destination-trips">
                      <TrendingUp size={20} />
                      <span>{destination.trips}</span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      currentUser
                        ? navigate("/create-trip")
                        : navigate("/login")
                    }
                    className="destination-btn"
                  >
                    Plan to {destination.city}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section-new">
        <div className="container">
          <div className="section-header-new">
            <h2>Real Stories From Real Travelers</h2>
            <p>See what people are saying about their AI-planned adventures</p>
          </div>

          <div className="testimonials-grid-new">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-new">
                <div className="testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#FFD93D" color="#FFD93D" />
                  ))}
                </div>

                <p className="testimonial-quote">"{testimonial.text}"</p>

                <div className="testimonial-author">
                  <div className="testimonial-avatar-new">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="testimonial-name">{testimonial.name}</p>
                    <p className="testimonial-location">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta">
        <div className="cta-background-shapes">
          <div className="cta-shape shape-1"></div>
          <div className="cta-shape shape-2"></div>
        </div>

        <div className="container">
          <div className="cta-content-new">
            <div className="cta-icon">🌟</div>
            <h2>Ready for Your Next Adventure?</h2>
            <p>
              Don't settle for generic guides. Let AI craft an experience
              <br />
              that's uniquely yours.
            </p>

            <div className="cta-buttons-new">
              <button
                onClick={() =>
                  currentUser ? navigate("/create-trip") : navigate("/login")
                }
                className="cta-btn-primary"
              >
                <Plane size={20} />
                Create Your Trip Now
              </button>
              <button className="cta-btn-secondary">
                <Heart size={20} />
                Save For Later
              </button>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
