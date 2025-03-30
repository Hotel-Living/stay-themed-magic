
// Theme types and data
export interface Theme {
  id: string;
  name: string;
  category?: string;
}

// Defining theme categories with updated structure for global use
export const themeCategories = [
  {
    category: "FOODS & DRINKS",
    themes: [
      { id: "spanish-cuisine", name: "Spanish Cuisine", category: "FOODS & DRINKS" },
      { id: "castilian-cuisine", name: "Castilian Cuisine", category: "FOODS & DRINKS" },
      { id: "andalusian-cuisine", name: "Andalusian Cuisine", category: "FOODS & DRINKS" },
      { id: "basque-cuisine", name: "Basque Cuisine", category: "FOODS & DRINKS" },
      { id: "galician-cuisine", name: "Galician Cuisine", category: "FOODS & DRINKS" },
      { id: "catalonian-cuisine", name: "Catalonian Cuisine", category: "FOODS & DRINKS" },
      { id: "french-cuisine", name: "French Cuisine", category: "FOODS & DRINKS" },
      { id: "italian-cuisine", name: "Italian Cuisine", category: "FOODS & DRINKS" },
      { id: "toscana-cuisine", name: "Toscana Cuisine", category: "FOODS & DRINKS" },
      { id: "meat-learning", name: "Meat Cooking", category: "FOODS & DRINKS" },
      { id: "fish-learning", name: "Fish Cooking", category: "FOODS & DRINKS" },
      { id: "seafood-learning", name: "Seafood Cooking", category: "FOODS & DRINKS" },
      { id: "wine", name: "Wine", category: "FOODS & DRINKS" },
      { id: "beer", name: "Beer", category: "FOODS & DRINKS" },
      { id: "cocktails", name: "Cocktails", category: "FOODS & DRINKS" },
      { id: "spirits", name: "Spirits", category: "FOODS & DRINKS" }
    ]
  },
  {
    category: "SPORTS",
    themes: [
      { id: "golf", name: "Golf", category: "SPORTS" },
      { id: "tennis", name: "Tennis", category: "SPORTS" },
      { id: "swimming", name: "Swimming", category: "SPORTS" },
      { id: "diving", name: "Diving", category: "SPORTS" },
      { id: "yoga", name: "Yoga", category: "SPORTS" },
      { id: "fitness", name: "Fitness", category: "SPORTS" }
    ]
  },
  {
    category: "ART",
    themes: [
      { id: "painting", name: "Painting", category: "ART" },
      { id: "sculpture", name: "Sculpture", category: "ART" },
      { id: "photography", name: "Photography", category: "ART" },
      { id: "architecture", name: "Architecture", category: "ART" },
      { id: "design", name: "Design", category: "ART" }
    ]
  },
  {
    category: "CULTURE",
    themes: [
      { id: "history", name: "History", category: "CULTURE" },
      { id: "museums", name: "Museums", category: "CULTURE" },
      { id: "local-traditions", name: "Local Traditions", category: "CULTURE" },
      { id: "festivals", name: "Festivals", category: "CULTURE" }
    ]
  },
  {
    category: "MUSIC",
    themes: [
      { id: "rock", name: "Rock", category: "MUSIC" },
      { id: "opera", name: "Opera", category: "MUSIC" },
      { id: "symphonic", name: "Symphonic", category: "MUSIC" },
      { id: "classical", name: "Classical", category: "MUSIC" },
      { id: "pop", name: "Pop", category: "MUSIC" }
    ]
  },
  {
    category: "LANGUAGES",
    themes: [
      { id: "english-practice", name: "English Practice", category: "LANGUAGES" },
      { id: "spanish-practice", name: "Spanish Practice", category: "LANGUAGES" },
      { id: "french-practice", name: "French Practice", category: "LANGUAGES" },
      { id: "german-practice", name: "German Practice", category: "LANGUAGES" },
      { id: "chinese-practice", name: "Chinese Practice", category: "LANGUAGES" },
      { id: "japanese-practice", name: "Japanese Practice", category: "LANGUAGES" },
      { id: "english-learning", name: "English Learning", category: "LANGUAGES" },
      { id: "spanish-learning", name: "Spanish Learning", category: "LANGUAGES" },
      { id: "french-learning", name: "French Learning", category: "LANGUAGES" },
      { id: "german-learning", name: "German Learning", category: "LANGUAGES" },
      { id: "chinese-learning", name: "Chinese Learning", category: "LANGUAGES" },
      { id: "japanese-learning", name: "Japanese Learning", category: "LANGUAGES" }
    ]
  },
  {
    category: "DANCE",
    themes: [
      { id: "ballroom", name: "Ballroom", category: "DANCE" },
      { id: "latin", name: "Latin", category: "DANCE" },
      { id: "contemporary", name: "Contemporary", category: "DANCE" },
      { id: "traditional", name: "Traditional", category: "DANCE" }
    ]
  },
  {
    category: "TECHNOLOGY",
    themes: [
      { id: "digital", name: "Digital", category: "TECHNOLOGY" },
      { id: "innovation", name: "Innovation", category: "TECHNOLOGY" },
      { id: "smart-home", name: "Smart Home", category: "TECHNOLOGY" }
    ]
  },
  {
    category: "SCIENCES",
    themes: [
      { id: "astronomy", name: "Astronomy", category: "SCIENCES" },
      { id: "biology", name: "Biology", category: "SCIENCES" },
      { id: "physics", name: "Physics", category: "SCIENCES" },
      { id: "chemistry", name: "Chemistry", category: "SCIENCES" }
    ]
  },
  {
    category: "LITERATURE",
    themes: [
      { id: "poetry", name: "Poetry", category: "LITERATURE" },
      { id: "novels", name: "Novels", category: "LITERATURE" },
      { id: "short-stories", name: "Short Stories", category: "LITERATURE" },
      { id: "book-clubs", name: "Book Clubs", category: "LITERATURE" }
    ]
  },
  {
    category: "GAMES",
    themes: [
      { id: "board-games", name: "Board Games", category: "GAMES" },
      { id: "card-games", name: "Card Games", category: "GAMES" },
      { id: "chess", name: "Chess", category: "GAMES" },
      { id: "video-games", name: "Video Games", category: "GAMES" }
    ]
  }
];

// Create a flat list of all themes for easier access
export const allThemes = themeCategories.flatMap(category => category.themes);
