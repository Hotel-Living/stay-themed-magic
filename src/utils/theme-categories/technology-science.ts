
import { ThemeCategory } from '../theme-types';

export const technologyCategory: ThemeCategory = {
  category: "TECHNOLOGY",
  themes: [
    { id: "digital", name: "Digital" },
    { id: "innovation", name: "Innovation" },
    { id: "smart-home", name: "Smart Home" },
    { id: "add-other", name: "Add other", isAddOption: true }
  ]
};

export const sciencesCategory: ThemeCategory = {
  category: "SCIENCES",
  themes: [
    { id: "astronomy", name: "Astronomy" },
    { id: "biology", name: "Biology" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "add-other", name: "Add other", isAddOption: true }
  ]
};
