
import { ThemeCategory } from '../theme-types';

export const foodAndDrinksCategory: ThemeCategory = {
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
            { 
              id: "france", 
              name: "France", 
              suboptions: ["French"] 
            },
            { 
              id: "italy", 
              name: "Italian", 
              suboptions: ["Toscana"] 
            },
            { 
              id: "add-other", 
              name: "Add other", 
              isAddOption: true 
            }
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
};
