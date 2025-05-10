
export interface Theme {
  id: string;
  name: string;
  description: string;
  created_at: string;
  category?: string;
}

export interface EditingTheme {
  id: string;
  field: string;
  value: string;
}

export interface ThemeToDelete {
  id: string;
  name: string;
}

export interface NewTheme {
  name: string;
  description: string;
  category?: string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}
