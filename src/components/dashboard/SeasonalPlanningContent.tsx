
import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart2, 
  ArrowUp, 
  ArrowDown,
  Lightbulb 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSeasonalTrends } from '@/hooks/useSeasonalTrends';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export const SeasonalPlanningContent = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { trends, loading, error } = useSeasonalTrends(selectedYear);
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to determine trend direction
  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="text-green-500 w-4 h-4" />;
    if (value < 0) return <ArrowDown className="text-red-500 w-4 h-4" />;
    return null;
  };

  // Generate years for the selector (current year and 2 previous years)
  const yearOptions = [selectedYear, selectedYear - 1, selectedYear - 2];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Seasonal Planning Tools</h2>
        <div className="flex items-center space-x-2">
          <span className="text-foreground/70">Year:</span>
          <div className="flex space-x-1">
            {yearOptions.map((year) => (
              <Button
                key={year}
                variant={year === selectedYear ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
                className={year === selectedYear ? "bg-fuchsia-600" : ""}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-fuchsia-950/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy Rates</TabsTrigger>
          <TabsTrigger value="pricing">Seasonal Pricing</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">
            There was an error loading seasonal data.
          </div>
        ) : (
          <>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trends?.overview?.map((stat, index) => (
                  <Card key={index} className="bg-fuchsia-950/70 border-fuchsia-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-foreground/70">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="flex items-center text-xs">
                          {getTrendIcon(stat.change)}
                          <span className={stat.change > 0 ? "text-green-500" : stat.change < 0 ? "text-red-500" : ""}>
                            {stat.change > 0 ? "+" : ""}{stat.change}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-fuchsia-950/70 border-fuchsia-900/50">
                <CardHeader>
                  <CardTitle>Yearly Performance</CardTitle>
                  <CardDescription>Bookings and revenue by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trends?.monthlyData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#999" />
                        <YAxis yAxisId="left" stroke="#999" />
                        <YAxis yAxisId="right" orientation="right" stroke="#999" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a002a', borderColor: '#660066' }} 
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="bookings" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          name="Bookings"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#82ca9d" 
                          name="Revenue ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="occupancy" className="space-y-4">
              <Card className="bg-fuchsia-950/70 border-fuchsia-900/50">
                <CardHeader>
                  <CardTitle>Monthly Occupancy Rates</CardTitle>
                  <CardDescription>Percentage of available rooms booked by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trends?.occupancyData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a002a', borderColor: '#660066' }} 
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="rate" 
                          fill="#8884d8" 
                          name="Occupancy Rate (%)" 
                        />
                        <Bar 
                          dataKey="avgIndustry" 
                          fill="#82ca9d" 
                          name="Industry Average (%)" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <Card className="bg-fuchsia-950/70 border-fuchsia-900/50">
                <CardHeader>
                  <CardTitle>Optimal Pricing Suggestions</CardTitle>
                  <CardDescription>Recommended price adjustments based on seasonal demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trends?.pricingData || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a002a', borderColor: '#660066' }} 
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="currentPrice" 
                          stroke="#8884d8" 
                          name="Current Price ($)" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="suggestedPrice" 
                          stroke="#82ca9d" 
                          name="Suggested Price ($)"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              {trends?.insights?.map((insight, index) => (
                <Card key={index} className="bg-fuchsia-950/70 border-fuchsia-900/50">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <CardTitle>{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80">{insight.description}</p>
                    {insight.action && (
                      <div className="mt-4 bg-fuchsia-900/30 p-3 rounded-lg">
                        <h4 className="font-medium text-sm text-foreground/90 mb-1">Recommended Action:</h4>
                        <p className="text-sm text-foreground/80">{insight.action}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default SeasonalPlanningContent;
