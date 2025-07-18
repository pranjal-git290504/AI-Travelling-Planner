const express = require('express');
const router = express.Router();
const {
  generateItinerary,
} = require('../controllers/gemini.controller');
const protect = require('../middleware/auth.middleware');

// All Gemini routes are protected
router.use(protect);

router.post('/generate-itinerary', generateItinerary);

module.exports = router;
