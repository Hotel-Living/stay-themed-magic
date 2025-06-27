
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DynamicFilterData {
  countries: Array<{ code: string; name: string; count: number }>;
  themes: Array<{ id: string; name: string; count: number; level: number }>;
  activities: Array<{ id: string; name: string; count: number }>;
  propertyTypes: Array<{ type: string; count: number }>;
  propertyStyles: Array<{ style: string; count: number }>;
  priceRange: { min: number; max: number; avg: number; count: number } | null;
  loading: boolean;
  error: string | null;
}

export const useDynamicFilterData = (): DynamicFilterData => {
  const [data, setData] = useState<DynamicFilterData>({
    countries: [],
    themes: [],
    activities: [],
    propertyTypes: [],
    propertyStyles: [],
    priceRange: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Fetch all data in parallel
        const [
          countriesResult,
          themesResult,
          activitiesResult,
          propertyTypesResult,
          propertyStylesResult,
          priceRangeResult
        ] = await Promise.all([
          supabase.rpc('get_unique_countries'),
          supabase.rpc('get_themes_with_counts'),
          supabase.rpc('get_activities_with_counts'),
          supabase.rpc('get_unique_property_types'),
          supabase.rpc('get_unique_property_styles'),
          supabase.rpc('get_price_distribution')
        ]);

        // Check for errors
        if (countriesResult.error) throw countriesResult.error;
        if (themesResult.error) throw themesResult.error;
        if (activitiesResult.error) throw activitiesResult.error;
        if (propertyTypesResult.error) throw propertyTypesResult.error;
        if (propertyStylesResult.error) throw propertyStylesResult.error;
        if (priceRangeResult.error) throw priceRangeResult.error;

        // Process the data
        const countries = (countriesResult.data || []).map(item => ({
          code: item.country_code,
          name: item.country_name,
          count: Number(item.hotel_count)
        }));

        const themes = (themesResult.data || []).map(item => ({
          id: item.theme_id,
          name: item.theme_name,
          count: Number(item.hotel_count),
          level: item.level
        }));

        const activities = (activitiesResult.data || []).map(item => ({
          id: item.activity_id,
          name: item.activity_name,
          count: Number(item.hotel_count)
        }));

        const propertyTypes = (propertyTypesResult.data || []).map(item => ({
          type: item.property_type,
          count: Number(item.hotel_count)
        }));

        const propertyStyles = (propertyStylesResult.data || []).map(item => ({
          style: item.property_style,
          count: Number(item.hotel_count)
        }));

        const priceRange = priceRangeResult.data?.[0] ? {
          min: priceRangeResult.data[0].min_price,
          max: priceRangeResult.data[0].max_price,
          avg: Number(priceRangeResult.data[0].avg_price),
          count: Number(priceRangeResult.data[0].hotel_count)
        } : null;

        setData({
          countries,
          themes,
          activities,
          propertyTypes,
          propertyStyles,
          priceRange,
          loading: false,
          error: null
        });

      } catch (err) {
        console.error('Error fetching dynamic filter data:', err);
        setData(prev => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }));
      }
    };

    fetchFilterData();

    // Set up real-time subscriptions for data changes
    const channel = supabase
      .channel('filter-data-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'hotels' }, () => {
        console.log('Hotels data changed, refreshing filter data');
        fetchFilterData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'themes' }, () => {
        console.log('Themes data changed, refreshing filter data');
        fetchFilterData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'activities' }, () => {
        console.log('Activities data changed, refreshing filter data');
        fetchFilterData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return data;
};
