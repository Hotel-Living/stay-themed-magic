
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Star, TrendingUp } from "lucide-react";
import { TravelSummary } from "../experience/TravelSummary";
import { TopAffinities } from "../experience/TopAffinities";
import { VisitedDestinations } from "../experience/VisitedDestinations";
import { BookingTimeline } from "../experience/BookingTimeline";
import { UserMilestones } from "../achievements/UserMilestones";

const ExperienceContent = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-fuchsia-400" />
          My Experience
        </h2>
        <p className="text-foreground/80 mb-6">
          Discover your journey with Hotel Living and see how far you've traveled.
        </p>

        {/* User Milestones */}
        <UserMilestones />

        {/* Travel Summary */}
        <TravelSummary />

        {/* Top Affinities */}
        <TopAffinities />

        {/* Visited Destinations Map */}
        <VisitedDestinations />

        {/* Timeline of Bookings */}
        <BookingTimeline />

        {/* Suggested Action */}
        <Card className="mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">Ready for your next adventure?</h3>
            <Button 
              onClick={() => navigate('/search')}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 text-lg"
            >
              What should I do next?
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceContent;
