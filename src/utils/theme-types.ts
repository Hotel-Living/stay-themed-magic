export interface Theme {
  id: string;
  name: string;
  description?: string;
  isAddOption?: boolean;
  category?: string;
}

export interface ThemeOption {
  id: string;
  name: string;
  suboptions?: string[];
  isAddOption?: boolean;
}

export interface ThemeSubmenu {
  name: string;
  options: ThemeOption[];
}

export interface ThemeSubcategory {
  name: string;
  themes?: Theme[];
  submenus?: ThemeSubmenu[];
}

export interface ThemeCategory {
  category: string;
  themes?: Theme[];
  subcategories?: ThemeSubcategory[];
}
