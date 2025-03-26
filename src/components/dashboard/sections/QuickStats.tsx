
import React from 'react';
import { Link } from "react-router-dom";
import { PlusCircle, Building, Users, DollarSign } from "lucide-react";
import StatCard from "../StatCard";

interface QuickStatsProps {
  handlePropertyTabClick: () => void;
}

export function QuickStats({ handlePropertyTabClick }: QuickStatsProps) {
  return (
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
  );
}

export default QuickStats;
