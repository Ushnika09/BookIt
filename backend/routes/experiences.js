import express from 'express';
import { 
  getAllExperiences, 
  getExperienceById,
  checkSlotAvailability 
} from '../controllers/experienceController.js';

const router = express.Router();

// GET /api/experiences - Get all experiences
router.get('/', getAllExperiences);

// GET /api/experiences/:id - Get single experience
router.get('/:id', getExperienceById);

// GET /api/experiences/:id/availability - Check slot availability
router.get('/:id/availability', checkSlotAvailability);

export default router;