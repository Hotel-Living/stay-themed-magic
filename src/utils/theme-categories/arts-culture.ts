
import { ThemeCategory } from '../theme-types';

export const artCategory: ThemeCategory = {
  category: "ART",
  themes: [
    { id: "painting", name: "Painting" },
    { id: "sculpture", name: "Sculpture" },
    { id: "photography", name: "Photography" },
    { id: "architecture", name: "Architecture" },
    { id: "design", name: "Design" },
    { id: "add-other", name: "Add other", isAddOption: true }
  ]
};

export const cultureCategory: ThemeCategory = {
  category: "CULTURE",
  themes: [
    { id: "history", name: "History" },
    { id: "museums", name: "Museums" },
    { id: "local-traditions", name: "Local Traditions" },
    { id: "festivals", name: "Festivals" },
    { id: "add-other", name: "Add other", isAddOption: true }
  ]
};
