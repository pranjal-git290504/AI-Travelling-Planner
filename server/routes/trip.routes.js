const express = require('express');
const router = express.Router();
const {
  getUserTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  updateTripChecklist,
} = require('../controllers/trip.controller');
const protect = require('../middleware/auth.middleware');

// All trip routes are protected
router.use(protect);

router.route('/')
  .get(getUserTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTripById)
  .put(updateTrip)
  .delete(deleteTrip);

router.put('/:id/checklist', updateTripChecklist);

module.exports = router;
