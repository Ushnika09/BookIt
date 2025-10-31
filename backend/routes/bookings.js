import express from 'express';
import { body } from 'express-validator';
import { 
  createBooking, 
  getBookingByReference,
  getBookingsByEmail 
} from '../controllers/bookingController.js';

const router = express.Router();

// Validation middleware
const bookingValidation = [
  body('experienceId').notEmpty().withMessage('Experience ID is required'),
  body('customerInfo.name').trim().notEmpty().withMessage('Name is required'),
  body('customerInfo.email').isEmail().withMessage('Valid email is required'),
  body('customerInfo.phone').notEmpty().withMessage('Phone number is required'),
  body('bookingDetails.date').notEmpty().withMessage('Booking date is required'),
  body('bookingDetails.timeSlot.startTime').notEmpty().withMessage('Start time is required'),
  body('bookingDetails.timeSlot.endTime').notEmpty().withMessage('End time is required'),
  body('bookingDetails.numberOfGuests')
    .isInt({ min: 1 })
    .withMessage('Number of guests must be at least 1')
];

// POST /api/bookings - Create new booking
router.post('/', bookingValidation, createBooking);

// GET /api/bookings/reference/:reference - Get booking by reference
router.get('/reference/:reference', getBookingByReference);

// GET /api/bookings - Get bookings by email
router.get('/', getBookingsByEmail);

export default router;