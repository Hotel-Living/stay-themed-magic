
import React from "react";
import { CalendarDays, DollarSign, Calendar, Building, Users, BarChart2, MessageSquare, Settings, Calculator, PlusCircle, TrendingUp } from 'lucide-react';

export const getDashboardTabs = () => {
  return [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <CalendarDays className="w-5 h-5" />,
      dataTab: "dashboard"
    },
    {
      id: "calculator",
      name: "Calculator",
      icon: <Calculator className="w-5 h-5" />,
      dataTab: "calculator"
    },
    {
      id: "addProperty",
      name: "Add Property",
      icon: <PlusCircle className="w-5 h-5" />,
      dataTab: "addProperty"
    },
    {
      id: "properties",
      name: "Properties",
      icon: <Building className="w-5 h-5" />,
      dataTab: "properties"
    },
    {
      id: "bookings",
      name: "Bookings",
      icon: <Calendar className="w-5 h-5" />,
      dataTab: "bookings"
    },
    {
      id: "guests",
      name: "Guests",
      icon: <Users className="w-5 h-5" />,
      dataTab: "guests"
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <BarChart2 className="w-5 h-5" />,
      dataTab: "analytics"
    },
    {
      id: "reviews",
      name: "Reviews",
      icon: <MessageSquare className="w-5 h-5" />,
      dataTab: "reviews"
    },
    {
      id: "seasonalPlanning",
      name: "Seasonal Planning",
      icon: <TrendingUp className="w-5 h-5" />,
      dataTab: "seasonalPlanning"
    },
    {
      id: "finances",
      name: "Finances",
      icon: <DollarSign className="w-5 h-5" />,
      dataTab: "finances"
    },
    {
      id: "settings",
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      dataTab: "settings"
    }
  ];
};
