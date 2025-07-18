const mongoose = require('mongoose');

// Activity Schema for nested documents inside the itinerary
const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Activity name is required'],
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      trim: true,
    },
    tips: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

// Daily Itinerary Schema for each day of the trip
const dayItinerarySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Date is required for daily itinerary'],
    },
    activities: [activitySchema],
    meals: {
      breakfast: {
        type: String,
        default: '',
      },
      lunch: {
        type: String,
        default: '',
      },
      dinner: {
        type: String,
        default: '',
      },
    },
    theme: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

// Preference schema for trip preferences
const preferenceSchema = new mongoose.Schema({
  budget: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury'],
    default: 'mid-range',
  },
  travelStyle: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends', 'business'],
    default: 'solo',
  },
  interests: {
    type: [String],
    default: [],
  },
  duration: {
    type: Number,
    required: [true, 'Trip duration is required'],
  },
});

// Main Trip Schema
const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required for a trip'],
    },
    destination: {
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
      },
    },
    dates: {
      startDate: {
        type: String,
        required: [true, 'Start date is required'],
      },
      endDate: {
        type: String,
        required: [true, 'End date is required'],
      },
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 day'],
    },
    status: {
      type: String,
      enum: ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    preferences: {
      type: preferenceSchema,
      default: {},
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    itinerary: [dayItinerarySchema],
    checklist: [
      {
        item: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        category: {
          type: String,
          default: 'general',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual for counting activities
tripSchema.virtual('activities').get(function () {
  return this.itinerary.reduce((total, day) => total + day.activities.length, 0);
});

// Virtual for counting favorites
tripSchema.virtual('favorites').get(function () {
  return 0; // Placeholder for future favorite functionality
});

// Set virtuals to true when converting to JSON
tripSchema.set('toJSON', { virtuals: true });
tripSchema.set('toObject', { virtuals: true });

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
