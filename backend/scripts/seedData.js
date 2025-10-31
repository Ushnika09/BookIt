import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../models/Experience.js';
import Promo from '../models/Promo.js';

dotenv.config();

// Generate slots for JS (no interfaces)
export const generateSlots = (daysCount = 6) => {
  const slots = [];
  const today = new Date();

  for (let i = 1; i <= daysCount; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    slots.push({
      date: date.toISOString().split("T")[0],
      timeSlots: [
        {
          startTime: "09:00 am",
          endTime: "12:00 pm",
          availableSpots: Math.floor(Math.random() * 8) + 3,
          totalSpots: 10,
          price: Math.floor(Math.random() * 2000) + 1500,
        },
        {
          startTime: "14:00 pm",
          endTime: "17:00 pm",
          availableSpots: Math.floor(Math.random() * 8) + 3,
          totalSpots: 10,
          price: Math.floor(Math.random() * 2000) + 1500,
        },
        {
          startTime: "18:00 pm",
          endTime: "21:00 pm",
          availableSpots: Math.floor(Math.random() * 6) + 2,
          totalSpots: 8,
          price: Math.floor(Math.random() * 2500) + 2000,
        },
      ],
    });
  }

  return slots;
};



const experiences = [
  {
    title: "Sunset Desert Safari with BBQ Dinner",
    description:
      "Experience the thrill of dune bashing in the golden sands of the Arabian Desert. Watch a breathtaking sunset, enjoy traditional entertainment including belly dancing and Tanoura shows, and feast on a delicious BBQ dinner under the stars. This adventure includes camel riding, sandboarding, and henna painting.",
    shortDescription:
      "Desert adventure with dune bashing, camel ride, and BBQ dinner",
    location: { city: "Dubai", country: "UAE", address: "Lahbab Desert, Dubai" },
    category: "adventure",
    duration: { value: 6, unit: "hours" },
    price: { amount: 2500, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3", alt: "Desert sunset" },
      { url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a", alt: "Dune bashing" },
    ],
    highlights: [
      "Thrilling dune bashing experience",
      "Camel riding and sandboarding",
      "Traditional belly dance and Tanoura show",
      "Unlimited BBQ dinner and drinks",
      "Henna painting and photo ops",
    ],
    included: ["Hotel pickup and drop-off", "Professional driver", "BBQ dinner", "Traditional shows", "Refreshments"],
    notIncluded: ["Quad biking", "Alcoholic beverages", "Personal expenses"],
    meetingPoint: "Hotel lobby pickup",
    rating: { average: 4.7, count: 324 },
    slots: generateSlots(),
  },
  {
    title: "Taj Mahal Sunrise Tour from Delhi",
    description:
      "Witness the magnificent Taj Mahal bathed in the golden glow of sunrise on this early morning tour from Delhi. Avoid the crowds and heat as you explore one of the Seven Wonders of the World. Your expert guide will share fascinating stories about this monument of love built by Emperor Shah Jahan. Visit Agra Fort and enjoy a traditional breakfast.",
    shortDescription: "Early morning guided tour to Taj Mahal with breakfast",
    location: { city: "Agra", country: "India", address: "Taj Mahal, Agra, Uttar Pradesh" },
    category: "cultural",
    duration: { value: 12, unit: "hours" },
    price: { amount: 3500, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523", alt: "Taj Mahal sunrise" },
      { url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da", alt: "Taj Mahal detail" },
    ],
    highlights: [
      "Beat the crowds with sunrise visit",
      "Expert local guide",
      "Visit Agra Fort UNESCO site",
      "Traditional Indian breakfast",
      "Comfortable AC transport from Delhi",
    ],
    included: ["Round-trip transport", "Entry tickets", "Breakfast", "Professional guide", "Bottled water"],
    notIncluded: ["Lunch", "Camera fees at monuments", "Tips"],
    meetingPoint: "Delhi hotel or agreed location (2:30 AM pickup)",
    rating: { average: 4.9, count: 567 },
    slots: generateSlots(),
  },
  {
    title: "Goa Beach Hopping & Water Sports",
    description:
      "Explore the best beaches of North Goa in this action-packed day trip. Start at Baga Beach for parasailing and jet skiing, move to Anjuna for its famous flea market, relax at Vagator Beach, and end with sunset at Chapora Fort. Includes lunch at a beach shack and plenty of photo opportunities.",
    shortDescription: "Full day beach tour with water sports and sightseeing",
    location: { city: "Goa", country: "India", address: "North Goa, Starting from Baga Beach" },
    category: "adventure",
    duration: { value: 8, unit: "hours" },
    price: { amount: 2800, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19", alt: "Goa beach" },
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5", alt: "Water sports" },
    ],
    highlights: [
      "Visit 4 famous North Goa beaches",
      "Thrilling water sports activities",
      "Anjuna Flea Market shopping",
      "Sunset at Chapora Fort",
      "Authentic Goan lunch",
    ],
    included: ["Hotel transfers", "Professional guide", "Lunch at beach shack", "Water bottles"],
    notIncluded: ["Water sports fees", "Personal shopping", "Alcoholic drinks"],
    meetingPoint: "Hotel pickup in North Goa area",
    rating: { average: 4.6, count: 289 },
    slots: generateSlots(),
  },
  {
    title: "Kerala Backwaters Houseboat Experience",
    description:
      "Cruise through the serene backwaters of Alleppey in a traditional Kerala houseboat. Drift past coconut groves, paddy fields, and village life. Watch local fishermen at work, spot exotic birds, and enjoy freshly prepared Kerala cuisine on board. This peaceful journey offers a unique glimpse into rural Kerala life.",
    shortDescription: "Relaxing houseboat cruise with authentic Kerala lunch",
    location: { city: "Alleppey", country: "India", address: "Alleppey Backwaters, Kerala" },
    category: "nature",
    duration: { value: 6, unit: "hours" },
    price: { amount: 4200, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944", alt: "Kerala houseboat" },
      { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5", alt: "Backwaters view" },
    ],
    highlights: [
      "Private houseboat experience",
      "Traditional Kerala cuisine on board",
      "Village and paddy field views",
      "Bird watching opportunities",
      "Peaceful and scenic journey",
    ],
    included: ["Houseboat rental", "Welcome drinks", "Kerala lunch", "Tea/coffee", "Pickup from Alleppey"],
    notIncluded: ["Hotel transfers outside Alleppey", "Alcoholic beverages", "Tips to crew"],
    meetingPoint: "Alleppey boat jetty",
    rating: { average: 4.8, count: 412 },
    slots: generateSlots(),
  },
  {
    title: "Jaipur Food Walk & Cultural Evening",
    description:
      "Discover the culinary treasures of the Pink City on this guided food walk through the old city. Sample 10+ authentic Rajasthani dishes from famous local eateries including dal baati churma, ghewar, and lassi. End the evening at a traditional haveli with a puppet show and folk music performance.",
    shortDescription: "Guided food tour with 10+ tastings and cultural show",
    location: { city: "Jaipur", country: "India", address: "Old City, Jaipur, Rajasthan" },
    category: "food",
    duration: { value: 4, unit: "hours" },
    price: { amount: 1800, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a", alt: "Jaipur street food" },
      { url: "https://images.unsplash.com/photo-1623003421580-78f3e13e2b35", alt: "Rajasthani thali" },
    ],
    highlights: [
      "10+ authentic food tastings",
      "Visit 6-7 local eateries",
      "Traditional puppet show",
      "Rajasthani folk music",
      "Small group experience",
    ],
    included: ["Food guide", "All food tastings", "Cultural show", "Bottled water"],
    notIncluded: ["Hotel transfers", "Additional food", "Tips"],
    meetingPoint: "Hawa Mahal main gate",
    rating: { average: 4.9, count: 178 },
    slots: generateSlots(),
  },
  {
    title: "Rishikesh River Rafting Adventure",
    description:
      "Experience the thrill of white water rafting on the holy Ganges River. Navigate through exciting rapids ranging from Grade I to Grade III, suitable for beginners and experienced rafters. Enjoy cliff jumping, body surfing, and swimming in calm stretches. All safety equipment and professional guides included.",
    shortDescription: "White water rafting with cliff jumping and beach camping",
    location: { city: "Rishikesh", country: "India", address: "Shivpuri, Rishikesh, Uttarakhand" },
    category: "adventure",
    duration: { value: 5, unit: "hours" },
    price: { amount: 1500, currency: "INR" },
    images: [
      { url: "https://plus.unsplash.com/premium_photo-1661891887710-0528c1d76b92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071", alt: "River rafting" },
      { url: "https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6", alt: "Rishikesh river" },
    ],
    highlights: [
      "Grade II & III rapids",
      "Cliff jumping opportunity",
      "Body surfing in calm water",
      "Beach camping and bonfire",
      "Certified instructors",
    ],
    included: ["Life jackets & helmets", "Professional guides", "Transport to/from put-in point", "Lunch on beach"],
    notIncluded: ["Hotel pickup", "Waterproof camera", "Change of clothes"],
    meetingPoint: "Shivpuri rafting point",
    rating: { average: 4.7, count: 445 },
    slots: generateSlots(),
  },
  {
    title: "Udaipur Palace Tour & Lake Cruise",
    description:
      "Explore the romantic city of lakes with visits to the magnificent City Palace, Jagdish Temple, and Saheliyon Ki Bari gardens. End your tour with a serene sunset boat ride on Lake Pichola, passing by the iconic Lake Palace and Jag Mandir. Perfect blend of history, architecture, and natural beauty.",
    shortDescription: "Palace tour with sunset boat ride on Lake Pichola",
    location: { city: "Udaipur", country: "India", address: "City Palace, Udaipur, Rajasthan" },
    category: "cultural",
    duration: { value: 6, unit: "hours" },
    price: { amount: 2200, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24", alt: "Udaipur palace" },
      { url: "https://images.unsplash.com/photo-1597466599360-3b9775841aec", alt: "Lake Pichola" },
    ],
    highlights: [
      "City Palace guided tour",
      "Jagdish Temple visit",
      "Saheliyon Ki Bari gardens",
      "Sunset boat ride",
      "Photo stops at best viewpoints",
    ],
    included: ["AC transportation", "Entry tickets", "Boat ride", "Professional guide", "Water bottles"],
    notIncluded: ["Lunch", "Camera fees", "Personal expenses"],
    meetingPoint: "Hotel lobby pickup",
    rating: { average: 4.8, count: 356 },
    slots: generateSlots(),
  },
  {
    title: "Mumbai Street Food & Markets Tour",
    description:
      "Dive into Mumbai's vibrant street food scene with a local guide. Sample iconic dishes like vada pav, pav bhaji, bhel puri, and more at the city's most famous spots. Explore bustling markets, learn about local ingredients, and discover hidden food gems. Vegetarian and non-vegetarian options available.",
    shortDescription: "Authentic Mumbai street food tour with 8+ tastings",
    location: { city: "Mumbai", country: "India", address: "Colaba to Chowpatty, Mumbai" },
    category: "food",
    duration: { value: 4, unit: "hours" },
    price: { amount: 1600, currency: "INR" },
    images: [
      { url: "https://images.unsplash.com/photo-1601050690597-df0568f70950", alt: "Mumbai street food" },
      { url: "https://images.unsplash.com/photo-1626074353765-517a681e40be", alt: "Vada pav" },
    ],
    highlights: [
      "8+ street food tastings",
      "Visit iconic food streets",
      "Local market exploration",
      "Mumbai chai experience",
      "Small group tour",
    ],
    included: ["Food guide", "All tastings", "Mineral water", "Local transport during tour"],
    notIncluded: ["Hotel transfers", "Additional food", "Tips"],
    meetingPoint: "Gateway of India",
    rating: { average: 4.8, count: 523 },
    slots: generateSlots(),
  },
];

const promoCodes = [
  {
    code: 'SAVE10',
    description: 'Get 10% off on your booking',
    discountType: 'percentage',
    discountValue: 10,
    maxDiscount: 500,
    minPurchase: 1000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 100,
    isActive: true
  },
  {
    code: 'FLAT100',
    description: 'Flat ₹100 off on any experience',
    discountType: 'fixed',
    discountValue: 100,
    minPurchase: 500,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 200,
    isActive: true
  },
  {
    code: 'FIRST20',
    description: 'First booking? Get 20% off',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscount: 1000,
    minPurchase: 2000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    usageLimit: 50,
    isActive: true
  },
  {
    code: 'ADVENTURE50',
    description: '₹50 off on adventure experiences',
    discountType: 'fixed',
    discountValue: 50,
    minPurchase: 1500,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    usageLimit: null,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Experience.deleteMany({});
    await Promo.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✨ Created ${createdExperiences.length} experiences`);

    const createdPromos = await Promo.insertMany(promoCodes);
    console.log(`🎟️  Created ${createdPromos.length} promo codes`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nAvailable Promo Codes:');
    createdPromos.forEach(promo => {
      console.log(`  - ${promo.code}: ${promo.description}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();