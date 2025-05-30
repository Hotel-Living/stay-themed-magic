
import { ThemeCategory_Legacy, LegacyTheme, ThemeSubcategory_Legacy } from '../theme-types';

export const foodAndDrinksCategory: ThemeCategory_Legacy = {
  category: "FOODS & DRINKS",
  subcategories: [
    {
      name: "Culinary",
      id: "culinary",
      level: 2,
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
    } as ThemeSubcategory_Legacy,
    {
      name: "Drinks",
      id: "drinks",
      level: 2,
      themes: [
        { id: "wine", name: "Wine", level: 3 },
        { id: "beer", name: "Beer", level: 3 },
        { id: "cocktails", name: "Cocktails", level: 3 },
        { id: "spirits", name: "Spirits", level: 3 },
        { id: "add-other", name: "Add other", isAddOption: true, level: 3 }
      ] as LegacyTheme[]
    } as ThemeSubcategory_Legacy
  ]
};
