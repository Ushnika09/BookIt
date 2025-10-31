import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  timeSlots: [{
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    availableSpots: {
      type: Number,
      required: true,
      min: 0
    },
    totalSpots: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }]
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  shortDescription: {
    type: String,
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    address: String
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'cultural', 'food', 'nature', 'wellness', 'entertainment']
  },
  duration: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['hours', 'days'],
      required: true
    }
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String
  }],
  highlights: [String],
  included: [String],
  notIncluded: [String],
  meetingPoint: String,
  cancellationPolicy: {
    type: String,
    default: 'Free cancellation up to 24 hours before the experience starts'
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  slots: [slotSchema],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
experienceSchema.index({ category: 1, isActive: 1 });
experienceSchema.index({ 'location.city': 1 });
experienceSchema.index({ 'slots.date': 1 });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;