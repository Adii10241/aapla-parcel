const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTrip, getMyTrips, getAvailableTrips, getTripById, updateTripStatus } = require('../controllers/tripController');

router.post('/', authMiddleware, createTrip);
router.get('/my', authMiddleware, getMyTrips);
router.get('/available', getAvailableTrips);
router.get('/:id', getTripById);
router.patch('/:id/status', authMiddleware, updateTripStatus);

module.exports = router;
