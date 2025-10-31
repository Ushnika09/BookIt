import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';
import Promo from '../models/Promo.js';
import mongoose from 'mongoose';

// Create new booking
export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { experienceId, customerInfo, bookingDetails, promoCode } = req.body;

    // Validate required fields
    if (!experienceId || !customerInfo || !bookingDetails) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Get experience
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Find the specific date slot
    const bookingDate = new Date(bookingDetails.date);
    const slot = experience.slots.find(s => {
      const slotDate = new Date(s.date);
      return slotDate.toDateString() === bookingDate.toDateString();
    });

    if (!slot) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'No slots available for the selected date'
      });
    }

    // Find specific time slot
    const timeSlot = slot.timeSlots.find(
      ts => ts.startTime === bookingDetails.timeSlot.startTime &&
            ts.endTime === bookingDetails.timeSlot.endTime
    );

    if (!timeSlot) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Selected time slot not found'
      });
    }

    // Check availability
    const requestedGuests = bookingDetails.numberOfGuests;
    if (timeSlot.availableSpots < requestedGuests) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Only ${timeSlot.availableSpots} spots available`
      });
    }

    // Calculate pricing
    const basePrice = timeSlot.price * requestedGuests;
    let discount = 0;
    let validPromoCode = null;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() }).session(session);
      if (promo) {
        const validity = promo.isValid();
        if (validity.valid) {
          const discountResult = promo.calculateDiscount(basePrice);
          if (discountResult.discount > 0) {
            discount = discountResult.discount;
            validPromoCode = promoCode.toUpperCase();

            // Increment usage count
            promo.usedCount += 1;
            await promo.save({ session });
          }
        }
      }
    }

    const totalPrice = basePrice - discount;

    // ✅ Manually generate bookingReference
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    const bookingReference = `BK${timestamp}${random}`;

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceTitle: experience.title,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone
      },
      bookingDetails: {
        date: bookingDate,
        timeSlot: {
          startTime: bookingDetails.timeSlot.startTime,
          endTime: bookingDetails.timeSlot.endTime
        },
        numberOfGuests: requestedGuests
      },
      pricing: {
        basePrice,
        discount,
        promoCode: validPromoCode,
        totalPrice
      },
      status: 'confirmed',
      bookingReference
    });

    await booking.save({ session });

    // Update available spots
    timeSlot.availableSpots -= requestedGuests;
    await experience.save({ session });

    // Commit transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: {
        bookingReference: booking.bookingReference,
        experienceTitle: booking.experienceTitle,
        customerInfo: booking.customerInfo,
        bookingDetails: booking.bookingDetails,
        pricing: booking.pricing,
        status: booking.status
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Booking creation error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Get booking by reference
export const getBookingByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    const booking = await Booking.findOne({
      bookingReference: reference.toUpperCase()
    }).select('-__v');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

// Get bookings by email
export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const bookings = await Booking.find({
      'customerInfo.email': email.toLowerCase()
    })
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};
