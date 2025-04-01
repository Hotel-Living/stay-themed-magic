
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Define types for our seasonal trends data
interface OverviewStat {
  title: string;
  value: string | number;
  change: number;
}

interface MonthlyData {
  month: string;
  bookings: number;
  revenue: number;
}

interface OccupancyData {
  month: string;
  rate: number;
  avgIndustry: number;
}

interface PricingData {
  month: string;
  currentPrice: number;
  suggestedPrice: number;
}

interface Insight {
  title: string;
  description: string;
  action?: string;
}

interface SeasonalTrendsData {
  overview: OverviewStat[];
  monthlyData: MonthlyData[];
  occupancyData: OccupancyData[];
  pricingData: PricingData[];
  insights: Insight[];
}

export function useSeasonalTrends(year: number) {
  const [trends, setTrends] = useState<SeasonalTrendsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user, profile } = useAuth();

  useEffect(() => {
    const fetchSeasonalData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // In a real application, we would fetch this data from Supabase
        // based on the hotel's bookings, revenue, and other metrics
        // For demonstration purposes, we'll generate sample data
        
        // First, try to get the user's hotels
        const { data: hotels, error: hotelsError } = await supabase
          .from('hotels')
          .select('id, name')
          .eq('owner_id', user.id);

        if (hotelsError) throw hotelsError;

        if (!hotels || hotels.length === 0) {
          // If no hotels, use demo data
          setTrends(generateDemoData(year));
        } else {
          // In a real app, we would fetch actual booking data for these hotels
          // and perform proper analysis
          
          // For now, still use demo data but with the hotel's name
          setTrends(generateDemoData(year, hotels[0].name));
          
          // This is where we would add the actual data fetching logic:
          /*
          // Get bookings for user's hotels for the specified year
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;
          
          const { data: bookings, error: bookingsError } = await supabase
            .from('bookings')
            .select('*')
            .in('hotel_id', hotels.map(h => h.id))
            .gte('check_in', startDate)
            .lte('check_out', endDate);
            
          if (bookingsError) throw bookingsError;
          
          // Process bookings into monthly data
          // ... algorithm to aggregate and analyze booking data
          
          // Generate insights based on the processed data
          // ... algorithm to generate actionable insights
          */
        }
      } catch (err: any) {
        console.error('Error fetching seasonal data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonalData();
  }, [user, year]);

  return { trends, loading, error };
}

// Function to generate demo data for the seasonal trends
function generateDemoData(year: number, hotelName: string = 'Your Hotel'): SeasonalTrendsData {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Generate random but realistic-looking data
  const monthlyData = months.map((month, index) => {
    // Create seasonal patterns
    const seasonalFactor = 
      // High season: summer and December
      (index >= 5 && index <= 7) || index === 11 
        ? Math.random() * 0.5 + 1.25 
      // Shoulder season: spring and fall
      : (index >= 2 && index <= 4) || (index >= 8 && index <= 10)
        ? Math.random() * 0.3 + 0.9
      // Low season: winter
      : Math.random() * 0.3 + 0.5;
      
    const bookings = Math.floor(20 * seasonalFactor);
    const revenue = Math.floor(2000 * seasonalFactor);
    
    return {
      month,
      bookings,
      revenue
    };
  });
  
  // Calculate year-over-year changes for overview stats
  const totalBookings = monthlyData.reduce((sum, data) => sum + data.bookings, 0);
  const totalRevenue = monthlyData.reduce((sum, data) => sum + data.revenue, 0);
  const avgOccupancy = Math.floor((totalBookings / (30 * 12)) * 100);
  
  // Generate overview stats
  const overview: OverviewStat[] = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      change: year === new Date().getFullYear() ? 12 : 8 // Fake YoY change
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      change: year === new Date().getFullYear() ? 18 : 5
    },
    {
      title: 'Avg. Occupancy',
      value: `${avgOccupancy}%`,
      change: year === new Date().getFullYear() ? 5 : -2
    },
    {
      title: 'Peak Season',
      value: 'Jun-Aug',
      change: 0 // No change for this stat
    }
  ];
  
  // Generate occupancy data with industry comparison
  const occupancyData = months.map((month, index) => {
    const baseRate = avgOccupancy;
    
    // Create seasonal patterns for occupancy
    const seasonalFactor = 
      (index >= 5 && index <= 7) || index === 11 
        ? Math.random() * 15 + 15
      : (index >= 2 && index <= 4) || (index >= 8 && index <= 10)
        ? Math.random() * 10 + 5
      : Math.random() * 5;
      
    const rate = Math.min(100, Math.floor(baseRate + seasonalFactor));
    const avgIndustry = Math.min(100, Math.floor(baseRate + (seasonalFactor * 0.8)));
    
    return {
      month,
      rate,
      avgIndustry
    };
  });
  
  // Generate pricing suggestions
  const pricingData = months.map((month, index) => {
    const basePrice = 100;
    
    // Create seasonal pricing
    const seasonalFactor = 
      (index >= 5 && index <= 7) || index === 11 
        ? 1.5 // High season
      : (index >= 2 && index <= 4) || (index >= 8 && index <= 10)
        ? 1.25 // Shoulder season
      : 1; // Low season
      
    const currentPrice = Math.floor(basePrice * seasonalFactor);
    const adjustment = occupancyData[index].rate > occupancyData[index].avgIndustry 
      ? 1.15 // If occupancy is above average, suggest higher prices
      : occupancyData[index].rate < occupancyData[index].avgIndustry - 10
        ? 0.9 // If occupancy is significantly below average, suggest lower prices
        : 1.05; // Otherwise suggest a small increase
        
    const suggestedPrice = Math.floor(currentPrice * adjustment);
    
    return {
      month,
      currentPrice,
      suggestedPrice
    };
  });
  
  // Generate insights
  const insights: Insight[] = [
    {
      title: 'Opportunity for Summer Rate Increase',
      description: `${hotelName} has consistently higher occupancy than the industry average during summer months. This suggests that demand is strong and there may be an opportunity to increase rates without significantly affecting booking volume.`,
      action: 'Consider increasing rates by 10-15% for June through August bookings, especially for weekends and holidays.'
    },
    {
      title: 'Winter Promotional Opportunity',
      description: `Occupancy drops significantly during January and February, which is typical of seasonal patterns. However, there may be opportunities to stimulate demand during this period.`,
      action: 'Create special winter packages combining accommodations with seasonal activities or experiences. Consider targeted promotions for business travelers or local weekend getaways.'
    },
    {
      title: 'Extend High Season Revenue',
      description: `There's a sharp drop in bookings and revenue between August and September, while weather conditions may still be favorable for travel.`,
      action: 'Develop "shoulder season" marketing campaigns highlighting value and reduced crowds. Target retirees and flexible travelers who can take advantage of off-peak rates.'
    }
  ];
  
  return {
    overview,
    monthlyData,
    occupancyData,
    pricingData,
    insights
  };
}
