import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  maxDiscount: {
    type: Number,
    default: null // Only for percentage discounts
  },
  minPurchase: {
    type: Number,
    default: 0
  },
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Method to check if promo is valid
promoSchema.methods.isValid = function() {
  const now = new Date();
  
  // Check if active
  if (!this.isActive) {
    return { valid: false, message: 'This promo code is not active' };
  }
  
  // Check date validity
  if (now < this.validFrom) {
    return { valid: false, message: 'This promo code is not yet valid' };
  }
  
  if (now > this.validUntil) {
    return { valid: false, message: 'This promo code has expired' };
  }
  
  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'This promo code has reached its usage limit' };
  }
  
  return { valid: true };
};

// Method to calculate discount
promoSchema.methods.calculateDiscount = function(amount) {
  if (amount < this.minPurchase) {
    return {
      discount: 0,
      message: `Minimum purchase of ₹${this.minPurchase} required`
    };
  }
  
  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (amount * this.discountValue) / 100;
    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else {
    discount = this.discountValue;
  }
  
  // Ensure discount doesn't exceed the total amount
  discount = Math.min(discount, amount);
  
  return {
    discount: Math.round(discount),
    finalAmount: Math.round(amount - discount)
  };
};

const Promo = mongoose.model('Promo', promoSchema);

export default Promo;