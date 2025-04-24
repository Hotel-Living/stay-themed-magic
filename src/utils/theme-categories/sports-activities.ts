
import { ThemeCategory } from '../theme-types';

export const sportsCategory: ThemeCategory = {
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
};

export const danceCategory: ThemeCategory = {
  category: "DANCE",
  themes: [
    { id: "ballroom", name: "Ballroom" },
    { id: "latin", name: "Latin" },
    { id: "contemporary", name: "Contemporary" },
    { id: "traditional", name: "Traditional" },
    { id: "add-other", name: "Add other", isAddOption: true }
  ]
};
