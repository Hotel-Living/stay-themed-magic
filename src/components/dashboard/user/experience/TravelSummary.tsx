
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, DollarSign } from "lucide-react";
import { useTravelSummary } from "./hooks/useTravelSummary";

export const TravelSummary: React.FC = () => {
  const { 
    totalStays, 
    uniqueCities, 
    totalDays, 
    totalSpent, 
    loading 
  } = useTravelSummary();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Travel Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading your travel summary...</div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      label: "Total Stays",
      value: totalStays,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-400"
    },
    {
      label: "Cities Visited",
      value: uniqueCities,
      icon: <MapPin className="w-5 h-5" />,
      color: "text-green-400"
    },
    {
      label: "Days Traveled",
      value: totalDays,
      icon: <Clock className="w-5 h-5" />,
      color: "text-purple-400"
    },
    {
      label: "Total Spent",
      value: totalSpent ? `$${totalSpent.toLocaleString()}` : "$0",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-amber-400"
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Travel Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-background/5 rounded-lg">
              <div className={`flex justify-center mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
