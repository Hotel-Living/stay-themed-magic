
// Theme categories data structure
export const themeCategories = [
  {
    category: "ART",
    themes: [
      { id: "painting", name: "Painting" },
      { id: "sculpture", name: "Sculpture" },
      { id: "photography", name: "Photography" },
      { id: "architecture", name: "Architecture" },
      { id: "design", name: "Design" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "CULTURE",
    themes: [
      { id: "history", name: "History" },
      { id: "museums", name: "Museums" },
      { id: "local-traditions", name: "Local Traditions" },
      { id: "festivals", name: "Festivals" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "DANCE",
    themes: [
      { id: "ballroom", name: "Ballroom" },
      { id: "latin", name: "Latin" },
      { id: "contemporary", name: "Contemporary" },
      { id: "traditional", name: "Traditional" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "FOODS & DRINKS",
    subcategories: [
      {
        name: "Culinary",
        submenus: [
          {
            name: "World Cuisines",
            options: [
              {
                id: "spain",
                name: "Spain",
                suboptions: ["Spanish", "Castilian", "Andalusian", "Basque", "Galician", "Catalonian"]
              },
              { id: "france", name: "France", suboptions: ["French"] },
              { id: "italy", name: "Italian", suboptions: ["Toscana"] },
              { id: "add-other", name: "Add other", isAddOption: true }
            ]
          },
          {
            name: "Cuisine Learning",
            options: [
              { id: "meat", name: "Meat" },
              { id: "fish", name: "Fish" },
              { id: "seafood", name: "Seafood" },
              { id: "add-other", name: "Add other", isAddOption: true }
            ]
          }
        ]
      },
      {
        name: "Drinks",
        themes: [
          { id: "wine", name: "Wine" },
          { id: "beer", name: "Beer" },
          { id: "cocktails", name: "Cocktails" },
          { id: "spirits", name: "Spirits" },
          { id: "add-other", name: "Add other", isAddOption: true }
        ]
      }
    ]
  },
  {
    category: "GAMES",
    themes: [
      { id: "board-games", name: "Board Games" },
      { id: "card-games", name: "Card Games" },
      { id: "chess", name: "Chess" },
      { id: "video-games", name: "Video Games" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "LANGUAGES",
    subcategories: [
      {
        name: "Practice",
        themes: [
          { id: "english-practice", name: "English" },
          { id: "spanish-practice", name: "Spanish" },
          { id: "french-practice", name: "French" },
          { id: "german-practice", name: "German" },
          { id: "chinese-practice", name: "Chinese" },
          { id: "japanese-practice", name: "Japanese" },
          { id: "add-other-practice", name: "Add other", isAddOption: true }
        ]
      },
      {
        name: "Learning",
        themes: [
          { id: "english-learning", name: "English" },
          { id: "spanish-learning", name: "Spanish" },
          { id: "french-learning", name: "French" },
          { id: "german-learning", name: "German" },
          { id: "chinese-learning", name: "Chinese" },
          { id: "japanese-learning", name: "Japanese" },
          { id: "add-other-learning", name: "Add other", isAddOption: true }
        ]
      }
    ]
  },
  {
    category: "LITERATURE",
    themes: [
      { id: "poetry", name: "Poetry" },
      { id: "novels", name: "Novels" },
      { id: "short-stories", name: "Short Stories" },
      { id: "book-clubs", name: "Book Clubs" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "MUSIC",
    themes: [
      { id: "rock", name: "Rock" },
      { id: "opera", name: "Opera" },
      { id: "symphonic", name: "Symphonic" },
      { id: "classical", name: "Classical" },
      { id: "pop", name: "Pop" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "SCIENCES",
    themes: [
      { id: "astronomy", name: "Astronomy" },
      { id: "biology", name: "Biology" },
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "SPORTS",
    themes: [
      { id: "golf", name: "Golf" },
      { id: "tennis", name: "Tennis" },
      { id: "swimming", name: "Swimming" },
      { id: "diving", name: "Diving" },
      { id: "yoga", name: "Yoga" },
      { id: "fitness", name: "Fitness" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  },
  {
    category: "TECHNOLOGY",
    themes: [
      { id: "digital", name: "Digital" },
      { id: "innovation", name: "Innovation" },
      { id: "smart-home", name: "Smart Home" },
      { id: "add-other", name: "Add other", isAddOption: true }
    ]
  }
];

// Sort theme categories alphabetically
export const sortedThemeCategories = [...themeCategories].sort((a, b) => 
  a.category.localeCompare(b.category)
);
