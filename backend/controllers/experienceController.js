import Experience from '../models/Experience.js';

// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const { category, city, minPrice, maxPrice } = req.query;
    
    // Build filter object
    const filter = { isActive: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }
    
    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = Number(minPrice);
      if (maxPrice) filter['price.amount'].$lte = Number(maxPrice);
    }
    
    const experiences = await Experience.find(filter)
      .select('-__v')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences',
      error: error.message
    });
  }
};

// Get single experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findById(id).select('-__v');
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    if (!experience.isActive) {
      return res.status(404).json({
        success: false,
        message: 'This experience is currently unavailable'
      });
    }
    
    // Filter out past dates
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const availableSlots = experience.slots.filter(slot => {
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      return slotDate >= currentDate;
    });
    
    // Create response with filtered slots
    const experienceData = experience.toObject();
    experienceData.slots = availableSlots;
    
    res.json({
      success: true,
      data: experienceData
    });
  } catch (error) {
    console.error('Get experience error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience details',
      error: error.message
    });
  }
};

// Check slot availability
export const checkSlotAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime } = req.query;
    
    if (!date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Date, start time, and end time are required'
      });
    }
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }
    
    // Find the specific slot
    const requestedDate = new Date(date);
    const slot = experience.slots.find(s => {
      const slotDate = new Date(s.date);
      return slotDate.toDateString() === requestedDate.toDateString();
    });
    
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'No slots available for this date'
      });
    }
    
    const timeSlot = slot.timeSlots.find(
      ts => ts.startTime === startTime && ts.endTime === endTime
    );
    
    if (!timeSlot) {
      return res.status(404).json({
        success: false,
        message: 'Requested time slot not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        available: timeSlot.availableSpots > 0,
        availableSpots: timeSlot.availableSpots,
        price: timeSlot.price
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check availability',
      error: error.message
    });
  }
};