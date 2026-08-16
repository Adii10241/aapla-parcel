const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createParcel, getMyParcels, getParcelById, updateParcelStatus, generatePickupOtp, verifyPickupOtp, generateDeliveryOtp, verifyDeliveryOtp } = require('../controllers/parcelController');

router.post('/', authMiddleware, createParcel);
router.get('/my', authMiddleware, getMyParcels);
router.get('/:id', getParcelById);
router.patch('/:id/status', authMiddleware, updateParcelStatus);
router.post('/:id/pickup-otp', authMiddleware, generatePickupOtp);
router.post('/:id/verify-pickup', authMiddleware, verifyPickupOtp);
router.post('/:id/delivery-otp', authMiddleware, generateDeliveryOtp);
router.post('/:id/verify-delivery', verifyDeliveryOtp);

module.exports = router;
