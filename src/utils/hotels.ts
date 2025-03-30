
import { Theme } from './themes';

// Hotel model definition
export interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  description: string;
  mainImage: string;
  images: string[];
  pricePerMonth: number;
  stars: number;
  rating: number;
  reviews: number;
  themes: Theme[];
  availableMonths: string[];
  features: string[];
  amenities: string[];
}

// Mock hotel data for testing
export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Culinary Palace",
    country: "Spain",
    city: "Barcelona",
    address: "123 Gaudi Street",
    description: "Immerse yourself in Spanish culinary traditions with daily cooking classes and wine tastings. Our expert chefs will guide you through the art of paella, tapas, and regional specialties.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Spanish+Cuisine+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1200,
    stars: 4,
    rating: 4.7,
    reviews: 128,
    themes: [
      { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
      { id: "wine", name: "Wine", category: "FOODS & DRINKS" }
    ],
    availableMonths: ["January", "February", "March", "April", "May", "June"],
    features: ["Kitchen", "Pool", "WiFi", "Restaurant"],
    amenities: ["Cooking Classes", "Wine Cellar", "Guided Food Tours"]
  },
  {
    id: "2",
    name: "Language Retreat",
    country: "France",
    city: "Paris",
    address: "45 Champs-Élysées",
    description: "Learn French in the heart of Paris. Daily language classes, conversation practice with locals, and cultural immersion activities make this the perfect place to master a new language.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Language+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1500,
    stars: 3,
    rating: 4.5,
    reviews: 92,
    themes: [
      { id: "french-learning", name: "French Learning", category: "LANGUAGES" }
    ],
    availableMonths: ["March", "April", "May", "June", "July", "August"],
    features: ["Library", "Study Rooms", "WiFi", "Café"],
    amenities: ["Language Classes", "Cultural Excursions", "Conversation Partners"]
  },
  {
    id: "3",
    name: "Digital Nomad Haven",
    country: "Italy",
    city: "Florence",
    address: "78 Renaissance Avenue",
    description: "A perfect blend of historic charm and modern technology. Work from our high-speed connected spaces while enjoying the inspiration of Renaissance art and architecture just outside your door.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Tech+Digital+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 1800,
    stars: 5,
    rating: 4.8,
    reviews: 154,
    themes: [
      { id: "digital", name: "Digital", category: "TECHNOLOGY" },
      { id: "innovation", name: "Innovation", category: "TECHNOLOGY" }
    ],
    availableMonths: ["January", "February", "September", "October", "November", "December"],
    features: ["Co-working Space", "High-speed Internet", "Meeting Rooms", "Tech Support"],
    amenities: ["Networking Events", "Tech Workshops", "Innovation Labs"]
  },
  {
    id: "4",
    name: "Yoga & Wellness Center",
    country: "USA",
    city: "San Diego",
    address: "500 Ocean Drive",
    description: "Rejuvenate your mind and body with our comprehensive wellness program. Daily yoga sessions, meditation, spa treatments, and healthy cuisine created by our nutritionist-guided chefs.",
    mainImage: "https://placehold.co/600x400/33021f/ffffff.webp?text=Yoga+Hotel",
    images: [
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+1",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+2",
      "https://placehold.co/600x400/33021f/ffffff.webp?text=Hotel+Image+3"
    ],
    pricePerMonth: 2200,
    stars: 5,
    rating: 4.9,
    reviews: 201,
    themes: [
      { id: "yoga", name: "Yoga", category: "SPORTS" },
      { id: "fitness", name: "Fitness", category: "SPORTS" }
    ],
    availableMonths: ["April", "May", "June", "July", "August", "September"],
    features: ["Yoga Studio", "Fitness Center", "Spa", "Organic Restaurant"],
    amenities: ["Daily Classes", "Personal Trainers", "Nutrition Consultation"]
  }
];
