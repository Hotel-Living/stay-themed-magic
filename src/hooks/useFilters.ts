
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface FilterItem {
  id: string;
  value: string;
}

export interface GroupedFilters {
  [category: string]: FilterItem[];
}

export const useFilters = () => {
  const [filters, setFilters] = useState<GroupedFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all filters from Supabase
  const fetchFilters = async () => {
    setLoading(true);
    setError(null);

    try {
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

      setFilters(groupedFilters);
    } catch (err: any) {
      console.error('Error fetching filters:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to load filters: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new filter
  const addFilter = async (category: string, value: string) => {
    if (!value.trim()) return false;

    try {
      // Check if a filter with this category and value already exists
      const { data: existingFilters } = await supabase
        .from('filters')
        .select('id')
        .eq('category', category)
        .eq('value', value)
        .limit(1);

      if (existingFilters && existingFilters.length > 0) {
        toast({
          title: "Error",
          description: "This filter already exists",
          variant: "destructive"
        });
        return false;
      }

      const { data, error } = await supabase
        .from('filters')
        .insert([{ category, value }])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Update local state
        const newFilter = { id: data[0].id, value: data[0].value };
        setFilters(prevFilters => ({
          ...prevFilters,
          [category]: [...(prevFilters[category] || []), newFilter]
        }));

        toast({
          title: "Success",
          description: "Filter added successfully",
        });
        return true;
      }
    } catch (err: any) {
      console.error('Error adding filter:', err);
      toast({
        title: "Error",
        description: `Failed to add filter: ${err.message}`,
        variant: "destructive"
      });
    }
    return false;
  };

  // Update an existing filter
  const updateFilter = async (category: string, id: string, newValue: string) => {
    if (!newValue.trim()) return false;

    try {
      // Check for duplicates before updating
      const { data: existingFilters } = await supabase
        .from('filters')
        .select('id')
        .eq('category', category)
        .eq('value', newValue)
        .neq('id', id)
        .limit(1);

      if (existingFilters && existingFilters.length > 0) {
        toast({
          title: "Error",
          description: "This filter value already exists",
          variant: "destructive"
        });
        return false;
      }

      const { error } = await supabase
        .from('filters')
        .update({ value: newValue })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setFilters(prevFilters => {
        const updatedCategory = prevFilters[category].map(filter =>
          filter.id === id ? { ...filter, value: newValue } : filter
        );
        return {
          ...prevFilters,
          [category]: updatedCategory
        };
      });

      toast({
        title: "Success",
        description: "Filter updated successfully",
      });
      return true;
    } catch (err: any) {
      console.error('Error updating filter:', err);
      toast({
        title: "Error",
        description: `Failed to update filter: ${err.message}`,
        variant: "destructive"
      });
    }
    return false;
  };

  // Delete a filter
  const deleteFilter = async (category: string, id: string) => {
    try {
      const { error } = await supabase
        .from('filters')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setFilters(prevFilters => {
        const updatedCategory = prevFilters[category].filter(filter => filter.id !== id);
        return {
          ...prevFilters,
          [category]: updatedCategory
        };
      });

      toast({
        title: "Success",
        description: "Filter deleted successfully",
      });
      return true;
    } catch (err: any) {
      console.error('Error deleting filter:', err);
      toast({
        title: "Error",
        description: `Failed to delete filter: ${err.message}`,
        variant: "destructive"
      });
    }
    return false;
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return {
    filters,
    loading,
    error,
    fetchFilters,
    addFilter,
    updateFilter,
    deleteFilter
  };
};
