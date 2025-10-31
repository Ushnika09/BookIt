import express from 'express';
import { body } from 'express-validator';
import { 
  validatePromoCode,
  getActivePromoCodes 
} from '../controllers/promoController.js';

const router = express.Router();

// Validation middleware
const promoValidation = [
  body('code').trim().notEmpty().withMessage('Promo code is required'),
  body('amount').isNumeric().withMessage('Amount must be a number')
];

// POST /api/promo/validate - Validate promo code
router.post('/validate', promoValidation, validatePromoCode);

// GET /api/promo - Get all active promo codes
router.get('/', getActivePromoCodes);

export default router;