
import React, { useState } from 'react';
import { BarChart3, ArrowUpRight, Calendar, DollarSign, Users, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EmptyState from './EmptyState';

// Sample data - would be replaced with real data in production
const bookingData = [
  { name: 'Jan', bookings: 5, revenue: 4500 },
  { name: 'Feb', bookings: 8, revenue: 6800 },
  { name: 'Mar', bookings: 12, revenue: 9500 },
  { name: 'Apr', bookings: 9, revenue: 7200 },
  { name: 'May', bookings: 15, revenue: 11000 },
  { name: 'Jun', bookings: 20, revenue: 14500 },
];

const occupancyData = [
  { name: 'Jan', occupancy: 67 },
  { name: 'Feb', occupancy: 72 },
  { name: 'Mar', occupancy: 85 },
  { name: 'Apr', occupancy: 76 },
  { name: 'May', occupancy: 90 },
  { name: 'Jun', occupancy: 95 },
];

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
};

const MetricCard = ({ title, value, change, icon, positive = true }: MetricCardProps) => (
  <div className="glass-card p-6 rounded-xl">
    <div className="flex justify-between items-start mb-3">
      <div className="rounded-lg bg-fuchsia-950/50 p-2">
        {icon}
      </div>
      <div className={`flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
        <span className="text-xs font-medium">{change}</span>
        <ArrowUpRight className={`w-3 h-3 ml-1 ${!positive && 'transform rotate-90'}`} />
      </div>
    </div>
    <h3 className="text-lg font-medium mb-1">{value}</h3>
    <p className="text-xs text-muted-foreground">{title}</p>
  </div>
);

type ChartPeriod = 'weekly' | 'monthly' | 'yearly';

export const AnalyticsContent = () => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>('monthly');
  const [showAnalytics, setShowAnalytics] = useState(true); // Toggle to show demo data or empty state
  
  if (!showAnalytics) {
    return (
      <EmptyState 
        icon={<BarChart3 className="w-8 h-8" />}
        title="Analytics Coming Soon"
        description="Detailed analytics about your properties, bookings, and revenue will be available here. Check back soon for insights into your business performance."
      />
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-fuchsia-400" />
            Performance Analytics
          </h2>
          <div className="flex rounded-lg bg-fuchsia-950/30 p-1">
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${chartPeriod === 'weekly' ? 'bg-fuchsia-600 text-white' : 'hover:bg-fuchsia-950/50'}`}
              onClick={() => setChartPeriod('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${chartPeriod === 'monthly' ? 'bg-fuchsia-600 text-white' : 'hover:bg-fuchsia-950/50'}`}
              onClick={() => setChartPeriod('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-md transition-colors ${chartPeriod === 'yearly' ? 'bg-fuchsia-600 text-white' : 'hover:bg-fuchsia-950/50'}`}
              onClick={() => setChartPeriod('yearly')}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Total Bookings" 
            value="69" 
            change="+12.5%" 
            icon={<Calendar className="w-5 h-5 text-fuchsia-400" />} 
          />
          <MetricCard 
            title="Revenue" 
            value="$53,500" 
            change="+8.2%" 
            icon={<DollarSign className="w-5 h-5 text-fuchsia-400" />} 
          />
          <MetricCard 
            title="Guests" 
            value="125" 
            change="+15.3%" 
            icon={<Users className="w-5 h-5 text-fuchsia-400" />} 
          />
          <MetricCard 
            title="Average Booking Value" 
            value="$775" 
            change="-3.1%" 
            icon={<CreditCard className="w-5 h-5 text-fuchsia-400" />}
            positive={false} 
          />
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Bookings & Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis yAxisId="left" stroke="#999" />
                <YAxis yAxisId="right" orientation="right" stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 16, 30, 0.9)', 
                    border: '1px solid rgba(138, 75, 175, 0.2)',
                    color: '#fff',
                    borderRadius: '8px' 
                  }} 
                />
                <Bar yAxisId="left" dataKey="bookings" fill="#9333ea" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar yAxisId="right" dataKey="revenue" fill="#c084fc" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Occupancy Rate (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={occupancyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(23, 16, 30, 0.9)', 
                    border: '1px solid rgba(138, 75, 175, 0.2)',
                    color: '#fff',
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="occupancy" fill="#d946ef" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Toggle to switch between demo mode and empty state for demonstration purposes */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowAnalytics(!showAnalytics)} 
          className="text-sm text-fuchsia-400 hover:text-fuchsia-300"
        >
          (Demo: {showAnalytics ? 'Show Empty State' : 'Show Analytics'})
        </button>
      </div>
    </div>
  );
};

export default AnalyticsContent;
