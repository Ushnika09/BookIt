import Promo from '../models/Promo.js';

// Validate promo code
export const validatePromoCode = async (req, res) => {
  try {
    const { code, amount } = req.body;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }
    
    // Find promo code
    const promo = await Promo.findOne({ 
      code: code.toUpperCase() 
    });
    
    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }
    
    // Check if promo is valid
    const validity = promo.isValid();
    
    if (!validity.valid) {
      return res.status(400).json({
        success: false,
        message: validity.message
      });
    }
    
    // Calculate discount
    const discountResult = promo.calculateDiscount(amount);
    
    if (discountResult.message) {
      return res.status(400).json({
        success: false,
        message: discountResult.message
      });
    }
    
    res.json({
      success: true,
      message: 'Promo code applied successfully',
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        discount: discountResult.discount,
        finalAmount: discountResult.finalAmount,
        originalAmount: amount
      }
    });
    
  } catch (error) {
    console.error('Promo validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate promo code',
      error: error.message
    });
  }
};

// Get all active promo codes (for admin/display purposes)
export const getActivePromoCodes = async (req, res) => {
  try {
    const now = new Date();
    
    const promoCodes = await Promo.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    })
    .select('code description discountType discountValue maxDiscount minPurchase validUntil')
    .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: promoCodes.length,
      data: promoCodes
    });
  } catch (error) {
    console.error('Get promo codes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch promo codes',
      error: error.message
    });
  }
};