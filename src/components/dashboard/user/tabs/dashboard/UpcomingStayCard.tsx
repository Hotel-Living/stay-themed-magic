
import React from "react";
import { Calendar, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/dateUtils";

interface UpcomingStayProps {
  upcomingStay: {
    hotelId: string;
    hotelName: string;
    location: string;
    checkIn: string;
    checkOut: string;
    days: number;
  } | null;
  isLoading: boolean;
}

export default function UpcomingStayCard({ upcomingStay, isLoading }: UpcomingStayProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
          <h2 className="text-xl font-bold">Upcoming Stay</h2>
        </div>
        <div className="p-6 bg-[#5c0869] animate-pulse">
          <div className="h-48 bg-fuchsia-500/10 rounded-xl"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-8">
      <div className="p-6 border-b border-fuchsia-900/20 bg-[#5c0869]">
        <h2 className="text-xl font-bold">Upcoming Stay</h2>
      </div>
      
      <div className="p-6 bg-[#5c0869]">
        {upcomingStay ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img src="/placeholder.svg" alt={upcomingStay.hotelName} className="w-full aspect-video object-cover rounded-lg" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">{upcomingStay.hotelName}</h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
                  ))}
                </div>
                <span>{upcomingStay.location}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                  <p className="font-medium">{formatDate(upcomingStay.checkIn)}</p>
                </div>
                <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                  <p className="font-medium">{formatDate(upcomingStay.checkOut)}</p>
                </div>
                <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{upcomingStay.days} days</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="rounded-lg px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground/80 text-sm font-medium transition-colors">
                  Contact Hotel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">No upcoming stays</h3>
            <p className="text-muted-foreground mb-6">Book your next thematic hotel experience.</p>
            <Link to="/" className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
              Browse Hotels <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
