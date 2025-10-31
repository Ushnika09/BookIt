import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL:  'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Experience API methods
export const experienceAPI = {
  // Get all experiences
  getAll: () => api.get('/experiences'),
  
  // Get single experience by ID
  getById: (id: string) => api.get(`/experiences/${id}`),
  
  // Check slot availability
  checkAvailability: (id: string, date: string, startTime: string, endTime: string) => 
    api.get(`/experiences/${id}/availability?date=${date}&startTime=${startTime}&endTime=${endTime}`),
};

// Booking API methods
export const bookingAPI = {
  create: (bookingData: any) => api.post('/bookings', bookingData),
  getById: (id: string) => api.get(`/bookings/${id}`),
  getByEmail: (email: string) => api.get(`/bookings?email=${email}`),
};

// Promo code API methods
export const promoAPI = {
  validate: (code: string) => api.get(`/promo/validate?code=${code}`),
};

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;