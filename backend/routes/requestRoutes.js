const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createRequest, getMyRequests, getRequestsForMyParcels, respondToRequest } = require('../controllers/requestController');

router.post('/', authMiddleware, createRequest);
router.get('/my', authMiddleware, getMyRequests);
router.get('/parcels', authMiddleware, getRequestsForMyParcels);
router.patch('/:id/respond', authMiddleware, respondToRequest);

module.exports = router;
