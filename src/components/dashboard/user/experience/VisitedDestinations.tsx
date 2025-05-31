
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useVisitedDestinations } from "./hooks/useVisitedDestinations";

export const VisitedDestinations: React.FC = () => {
  const { destinations, loading } = useVisitedDestinations();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Visited Destinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading your destinations...</div>
        </CardContent>
      </Card>
    );
  }

  if (destinations.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Visited Destinations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-foreground/60">
            Your travel destinations will appear here after your first stay.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Visited Destinations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="p-3 bg-background/5 rounded-lg text-center hover:bg-background/10 transition-colors"
            >
              <div className="text-sm font-medium">{destination.city}</div>
              <div className="text-xs text-foreground/60">{destination.country}</div>
              <div className="text-xs text-fuchsia-400 mt-1">
                {destination.stayCount} stay{destination.stayCount > 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
