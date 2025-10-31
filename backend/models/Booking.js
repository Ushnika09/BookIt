import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true
  },
  experienceTitle: {
    type: String,
    required: true
  },
  customerInfo: {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    }
  },
  bookingDetails: {
    date: {
      type: Date,
      required: true
    },
    timeSlot: {
      startTime: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      }
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1
    }
  },
  pricing: {
    basePrice: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    promoCode: {
      type: String,
      default: null
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.bookingReference = `BK${timestamp}${random}`;
  }
  next();
});

// Index for faster queries
bookingSchema.index({ 'customerInfo.email': 1 });
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ experienceId: 1, 'bookingDetails.date': 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;