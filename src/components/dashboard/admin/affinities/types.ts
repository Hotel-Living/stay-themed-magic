
export interface Theme {
  id: string;
  name: string;
  description?: string | null;
  category?: string;
  parent_id?: string | null;
  level: 1 | 2 | 3;
  sort_order?: number;
  created_at: string;
  parent?: {
    name: string;
  };
  children?: Array<{
    id: string;
    name: string;
    level: number;
  }>;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export interface NewTheme {
  name: string;
  description: string;
  category: string;
  parent_id?: string | null;
  level: 1 | 2 | 3;
  sort_order?: number;
}

export interface EditingTheme extends Theme {
  isEditing: boolean;
}

export interface ThemeToDelete {
  id: string;
  name: string;
}
