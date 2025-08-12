const Trip = require('../models/trip.model');
const mongoose = require('mongoose');

// @desc    Get all trips for a user
// @route   GET /api/trips
// @access  Private
const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(trips);
  } catch (error) {
    console.error('Get user trips error:', error);
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

// @desc    Get single trip by ID
// @route   GET /api/trips/:id
// @access  Private
const getTripById = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).select('-__v');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you do not have access' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Get trip by ID error:', error);
    res.status(500).json({ message: 'Error fetching trip', error: error.message });
  }
};

// @desc    Create a new trip
// @route   POST /api/trips
// @access  Private
const createTrip = async (req, res) => {
  try {
    const {
      destination,
      dates,
      duration,
      status,
      preferences,
      thumbnailUrl,
      itinerary,
      checklist,
    } = req.body;

    // Create the trip with the user ID from the auth middleware
    const trip = await Trip.create({
      userId: req.user._id,
      destination,
      dates,
      duration,
      status: status || 'upcoming',
      preferences,
      thumbnailUrl,
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      checklist: Array.isArray(checklist) ? checklist : [],
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(400).json({ message: 'Error creating trip', error: error.message });
  }
};

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private
const updateTrip = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you do not have access' });
    }

    const {
      destination,
      dates,
      duration,
      status,
      preferences,
      thumbnailUrl,
      itinerary,
      checklist,
    } = req.body;

    // Update the trip fields
    if (destination) trip.destination = destination;
    if (dates) trip.dates = dates;
    if (duration) trip.duration = duration;
    if (status) trip.status = status;
    if (preferences) trip.preferences = preferences;
    if (thumbnailUrl) trip.thumbnailUrl = thumbnailUrl;
    if (itinerary) trip.itinerary = Array.isArray(itinerary) ? itinerary : trip.itinerary;
    if (checklist) trip.checklist = Array.isArray(checklist) ? checklist : trip.checklist;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(400).json({ message: 'Error updating trip', error: error.message });
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private
const deleteTrip = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you do not have access' });
    }

    await Trip.deleteOne({ _id: req.params.id });
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ message: 'Error deleting trip', error: error.message });
  }
};

// @desc    Update trip checklist
// @route   PUT /api/trips/:id/checklist
// @access  Private
const updateTripChecklist = async (req, res) => {
  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid trip ID format' });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found or you do not have access' });
    }

    const { checklist } = req.body;
    
    if (Array.isArray(checklist)) {
      trip.checklist = checklist;
      const updatedTrip = await trip.save();
      res.json(updatedTrip.checklist);
    } else {
      res.status(400).json({ message: 'Checklist must be an array' });
    }
  } catch (error) {
    console.error('Update trip checklist error:', error);
    res.status(400).json({ message: 'Error updating trip checklist', error: error.message });
  }
};

module.exports = {
  getUserTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  updateTripChecklist,
};
