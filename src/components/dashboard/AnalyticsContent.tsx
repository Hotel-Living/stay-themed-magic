
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, Home, DollarSign, Calendar, TrendingUp, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsContent() {
  const [timeframe, setTimeframe] = useState("month");
  
  // Sample data - in a real app, this would come from an API
  const bookingData = [
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

  const revenueData = [
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

  const visitorData = [
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

  const occupancyRateData = [
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

  const reviewDistributionData = [
    { name: '5 Stars', value: 65, color: '#16a34a' },
    { name: '4 Stars', value: 20, color: '#22c55e' },
    { name: '3 Stars', value: 10, color: '#fbbf24' },
    { name: '2 Stars', value: 3, color: '#f97316' },
    { name: '1 Star', value: 2, color: '#ef4444' },
  ];

  const bookingSourceData = [
    { name: 'Direct', value: 35, color: '#8b5cf6' },
    { name: 'Booking.com', value: 30, color: '#6366f1' },
    { name: 'Airbnb', value: 25, color: '#ec4899' },
    { name: 'Expedia', value: 10, color: '#0ea5e9' },
  ];

  // Key performance indicators
  const kpis = [
    {
      title: "Total Bookings",
      value: "157",
      change: "+12%",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Revenue",
      value: "$157,000",
      change: "+23%",
      icon: DollarSign,
      trend: "up",
    },
    {
      title: "Average Occupancy",
      value: "83%",
      change: "+5%",
      icon: Home,
      trend: "up",
    },
    {
      title: "Total Visitors",
      value: "3,120",
      change: "+18%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Average Rating",
      value: "4.7",
      change: "+0.2",
      icon: Star,
      trend: "up",
    },
    {
      title: "Revenue per Available Room",
      value: "$97",
      change: "+7%",
      icon: TrendingUp,
      trend: "up",
    },
  ];

  const filterDataByTimeframe = (data: any[]) => {
    if (timeframe === "year") return data;
    if (timeframe === "quarter") return data.slice(data.length - 3);
    if (timeframe === "month") return data.slice(data.length - 1);
    return data;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, index) => (
          <StatCard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>Monthly booking trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Visitors Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Website Visitors</CardTitle>
            <CardDescription>Property listing page views</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Rate Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
            <CardDescription>Monthly occupancy percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Occupancy Rate']} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#f97316" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Review Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Review Distribution</CardTitle>
            <CardDescription>Rating breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reviewDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reviewDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Booking Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Sources</CardTitle>
            <CardDescription>Distribution by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bookingSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
