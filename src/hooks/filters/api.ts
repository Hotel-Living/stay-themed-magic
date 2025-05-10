
import { supabase } from "@/integrations/supabase/client";
import { GroupedFilters } from "./types";

export const fetchFiltersFromAPI = async (): Promise<GroupedFilters> => {
  const { data, error } = await supabase
    .from('filters')
    .select('id, category, value')
    .order('value');

  if (error) {
    throw error;
  }

  // Group filters by category
  const groupedFilters: GroupedFilters = {};
  data?.forEach((filter) => {
    if (!groupedFilters[filter.category]) {
      groupedFilters[filter.category] = [];
    }
    groupedFilters[filter.category].push({
      id: filter.id,
      value: filter.value
    });
  });

  return groupedFilters;
};

export const addFilterToAPI = async (category: string, value: string) => {
  // Check if a filter with this category and value already exists
  const { data: existingFilters } = await supabase
    .from('filters')
    .select('id')
    .eq('category', category)
    .eq('value', value)
    .limit(1);

  if (existingFilters && existingFilters.length > 0) {
    throw new Error("This filter already exists");
  }

  const { data, error } = await supabase
    .from('filters')
    .insert([{ category, value }])
    .select();

  if (error) {
    throw error;
  }

  return data && data.length > 0 ? data[0] : null;
};

export const updateFilterInAPI = async (id: string, category: string, newValue: string) => {
  // Check for duplicates before updating
  const { data: existingFilters } = await supabase
    .from('filters')
    .select('id')
    .eq('category', category)
    .eq('value', newValue)
    .neq('id', id)
    .limit(1);

  if (existingFilters && existingFilters.length > 0) {
    throw new Error("This filter value already exists");
  }

  const { error } = await supabase
    .from('filters')
    .update({ value: newValue })
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
};

export const deleteFilterFromAPI = async (id: string) => {
  const { error } = await supabase
    .from('filters')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
};
