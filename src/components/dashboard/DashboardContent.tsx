
import React from 'react';
import { Link } from "react-router-dom";
import { PlusCircle, FileText, HelpCircle, Users, DollarSign, Building } from "lucide-react";
import StatCard from "./StatCard";
import BookingItem from "./BookingItem";
import ReviewItem from "./ReviewItem";
import ActionCard from "./ActionCard";

export default function DashboardContent() {
  const handlePropertyTabClick = () => {
    const propertyTab = document.querySelector('button[data-tab="addProperty"]');
    if (propertyTab instanceof HTMLElement) {
      propertyTab.click();
    }
  };
  
  const mockBookings = {
    emmaBooking: {
      id: "1",
      user_id: "user1",
      hotel_id: "hotel1",
      check_in: "2023-11-15",
      check_out: "2023-11-23",
      total_price: 1200,
      status: "confirmed" as const,
      created_at: "2023-10-01",
      updated_at: "2023-10-01"
    },
    michaelBooking: {
      id: "2",
      user_id: "user2",
      hotel_id: "hotel2",
      check_in: "2023-12-05",
      check_out: "2023-12-21",
      total_price: 2400,
      status: "pending" as const,
      created_at: "2023-11-01",
      updated_at: "2023-11-01"
    },
    sarahBooking: {
      id: "3",
      user_id: "user3",
      hotel_id: "hotel1",
      check_in: "2024-01-10",
      check_out: "2024-01-18",
      total_price: 1500,
      status: "confirmed" as const,
      created_at: "2023-12-01",
      updated_at: "2023-12-01"
    }
  };
  
  return (
    <>
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Active Properties" 
            value="2" 
            change="+1" 
            icon={Building} 
            trend="up"
          />
          <StatCard 
            title="Total Bookings" 
            value="28" 
            change="+4" 
            icon={Users} 
            trend="up"
          />
          <StatCard 
            title="This Month Revenue" 
            value="$4,580" 
            change="+12%" 
            icon={DollarSign} 
            trend="up"
          />
          <Link 
            to="/hotel-dashboard/add-property" 
            className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg p-4 hover:bg-fuchsia-900/30 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handlePropertyTabClick();
            }}
          >
            <span className="text-fuchsia-300 font-medium flex items-center">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Property
            </span>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            <BookingItem 
              booking={mockBookings.emmaBooking}
              name="Emma Thompson" 
              dates="Nov 15 - Nov 23" 
              property="Parador de Granada"
              status="confirmed"
            />
            <BookingItem 
              booking={mockBookings.michaelBooking}
              name="Michael Chen" 
              dates="Dec 5 - Dec 21" 
              property="TechHub Barcelona"
              status="pending"
            />
            <BookingItem 
              booking={mockBookings.sarahBooking}
              name="Sarah Johnson" 
              dates="Jan 10 - Jan 18" 
              property="Parador de Granada"
              status="confirmed"
            />
          </div>
          <button className="w-full mt-4 py-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition">
            View all bookings
          </button>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <ReviewItem 
              name="James Wilson" 
              rating={5}
              property="Parador de Granada"
              comment="Amazing experience! The Spanish language immersion program exceeded my expectations."
              date="3 days ago"
            />
            <ReviewItem 
              name="Lisa Garcia" 
              rating={4}
              property="TechHub Barcelona"
              comment="Great facilities and tech workshops. Would recommend for longer stays."
              date="1 week ago"
            />
          </div>
          <button className="w-full mt-4 py-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition">
            View all reviews
          </button>
        </div>
      </div>
      
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ActionCard 
            title="Add Property" 
            description="List a new hotel property" 
            icon={<PlusCircle className="w-5 h-5" />}
            onClick={handlePropertyTabClick}
          />
          <ActionCard 
            title="Reports" 
            description="View monthly performance reports" 
            icon={<FileText className="w-5 h-5" />}
          />
          <ActionCard 
            title="Support" 
            description="Contact our partner support team" 
            icon={<HelpCircle className="w-5 h-5" />}
          />
        </div>
      </div>
    </>
  );
}
