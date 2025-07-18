const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');



// User management
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

// Trip management
router.get('/trips', authMiddleware, adminMiddleware, adminController.getAllTrips);
router.delete('/trips/:id', authMiddleware, adminMiddleware, adminController.deleteTrip);


module.exports = router;
