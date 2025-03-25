
// The Theme type interface (importing from the file where it might be defined)
export interface Theme {
  id: string;
  name: string;
  category: string;
}

export const allThemes: Theme[] = [
  { id: '1', name: 'Language Learning', category: 'Education' },
  { id: '2', name: 'Digital Nomad', category: 'Lifestyle' },
  { id: '3', name: 'Culinary', category: 'Food & Drink' },
  { id: '4', name: 'Wellness', category: 'Health' },
  { id: '5', name: 'Adventure', category: 'Outdoor' },
  { id: '6', name: 'Cultural', category: 'Experience' },
  { id: '7', name: 'Art & Design', category: 'Creative' },
  { id: '8', name: 'Eco-friendly', category: 'Sustainability' },
  { id: '9', name: 'Family', category: 'Community' },
  { id: '10', name: 'Luxury', category: 'Premium' }
];

export const themeCategories = [
  {
    category: 'Education',
    themes: allThemes.filter(theme => theme.category === 'Education')
  },
  {
    category: 'Lifestyle',
    themes: allThemes.filter(theme => theme.category === 'Lifestyle')
  },
  {
    category: 'Food & Drink',
    themes: allThemes.filter(theme => theme.category === 'Food & Drink')
  },
  {
    category: 'Health',
    themes: allThemes.filter(theme => theme.category === 'Health')
  },
  {
    category: 'Outdoor',
    themes: allThemes.filter(theme => theme.category === 'Outdoor')
  },
  {
    category: 'Experience',
    themes: allThemes.filter(theme => theme.category === 'Experience')
  },
  {
    category: 'Creative',
    themes: allThemes.filter(theme => theme.category === 'Creative')
  },
  {
    category: 'Sustainability',
    themes: allThemes.filter(theme => theme.category === 'Sustainability')
  },
  {
    category: 'Community',
    themes: allThemes.filter(theme => theme.category === 'Community')
  },
  {
    category: 'Premium',
    themes: allThemes.filter(theme => theme.category === 'Premium')
  }
];

export const countries = [
  { id: 'spain', name: 'Spain 🇪🇸' },
  { id: 'france', name: 'France 🇫🇷' },
  { id: 'italy', name: 'Italy 🇮🇹' },
  { id: 'usa', name: 'USA 🇺🇸' },
  { id: 'egypt', name: 'Egypt 🇪🇬' },
  { id: 'turkey', name: 'Turkey 🇹🇷' }
];

// Define a Hotel interface for the mock data
export interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  images: string[];
  stars: number;
  pricePerMonth: number;
  themes: string[];
}
