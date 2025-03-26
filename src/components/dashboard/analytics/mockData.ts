
// Sample data for analytics charts

export const bookingData = [
  { name: 'Jan', bookings: 4 },
  { name: 'Feb', bookings: 3 },
  { name: 'Mar', bookings: 2 },
  { name: 'Apr', bookings: 7 },
  { name: 'May', bookings: 9 },
  { name: 'Jun', bookings: 12 },
  { name: 'Jul', bookings: 15 },
  { name: 'Aug', bookings: 18 },
  { name: 'Sep', bookings: 10 },
  { name: 'Oct', bookings: 8 },
  { name: 'Nov', bookings: 6 },
  { name: 'Dec', bookings: 11 },
];

export const revenueData = [
  { name: 'Jan', revenue: 6000 },
  { name: 'Feb', revenue: 4500 },
  { name: 'Mar', revenue: 3000 },
  { name: 'Apr', revenue: 10500 },
  { name: 'May', revenue: 13500 },
  { name: 'Jun', revenue: 18000 },
  { name: 'Jul', revenue: 22500 },
  { name: 'Aug', revenue: 27000 },
  { name: 'Sep', revenue: 15000 },
  { name: 'Oct', revenue: 12000 },
  { name: 'Nov', revenue: 9000 },
  { name: 'Dec', revenue: 16500 },
];

export const visitorData = [
  { name: 'Jan', visitors: 120 },
  { name: 'Feb', visitors: 150 },
  { name: 'Mar', visitors: 180 },
  { name: 'Apr', visitors: 220 },
  { name: 'May', visitors: 300 },
  { name: 'Jun', visitors: 350 },
  { name: 'Jul', visitors: 400 },
  { name: 'Aug', visitors: 450 },
  { name: 'Sep', visitors: 320 },
  { name: 'Oct', visitors: 280 },
  { name: 'Nov', visitors: 240 },
  { name: 'Dec', visitors: 290 },
];

export const occupancyRateData = [
  { name: 'Jan', rate: 60 },
  { name: 'Feb', rate: 55 },
  { name: 'Mar', rate: 50 },
  { name: 'Apr', rate: 70 },
  { name: 'May', rate: 75 },
  { name: 'Jun', rate: 85 },
  { name: 'Jul', rate: 95 },
  { name: 'Aug', rate: 98 },
  { name: 'Sep', rate: 80 },
  { name: 'Oct', rate: 75 },
  { name: 'Nov', rate: 65 },
  { name: 'Dec', rate: 82 },
];

export const reviewDistributionData = [
  { name: '5 Stars', value: 65, color: '#16a34a' },
  { name: '4 Stars', value: 20, color: '#22c55e' },
  { name: '3 Stars', value: 10, color: '#fbbf24' },
  { name: '2 Stars', value: 3, color: '#f97316' },
  { name: '1 Star', value: 2, color: '#ef4444' },
];

export const bookingSourceData = [
  { name: 'Direct', value: 35, color: '#8b5cf6' },
  { name: 'Booking.com', value: 30, color: '#6366f1' },
  { name: 'Airbnb', value: 25, color: '#ec4899' },
  { name: 'Expedia', value: 10, color: '#0ea5e9' },
];

// Helper function to filter data based on timeframe
export const filterDataByTimeframe = (data: any[], timeframe: string) => {
  if (timeframe === "year") return data;
  if (timeframe === "quarter") return data.slice(data.length - 3);
  if (timeframe === "month") return data.slice(data.length - 1);
  return data;
};
