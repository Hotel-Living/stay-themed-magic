
import React from "react";
import { Link } from "react-router-dom";
import { Building, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";

export const DashboardSelector = () => {
  const { profile } = useAuth();
  const isAdmin = useIsAdmin();
  
  // Don't show if user has no dashboard access
  if (!isAdmin && !profile?.is_hotel_owner) {
    return null;
  }
  
  // If user only has one role, show direct link
  if (isAdmin && !profile?.is_hotel_owner) {
    return (
      <Link
        to="/admin"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700/50 rounded-lg transition-colors"
      >
        <Shield className="w-4 h-4" />
        Admin Dashboard
      </Link>
    );
  }
  
  if (!isAdmin && profile?.is_hotel_owner) {
    return (
      <Link
        to="/hotel-dashboard"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700/50 rounded-lg transition-colors"
      >
        <Building className="w-4 h-4" />
        Hotel Dashboard
      </Link>
    );
  }
  
  // If user has both roles, show dropdown/selector
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700/50 rounded-lg transition-colors">
        <Shield className="w-4 h-4" />
        Dashboards
      </button>
      <div className="absolute top-full left-0 mt-1 bg-purple-900 border border-purple-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-48 z-50">
        <Link
          to="/admin"
          className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-purple-800 first:rounded-t-lg"
        >
          <Shield className="w-4 h-4" />
          Admin Dashboard
        </Link>
        <Link
          to="/hotel-dashboard"
          className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-purple-800 last:rounded-b-lg"
        >
          <Building className="w-4 h-4" />
          Hotel Dashboard
        </Link>
      </div>
    </div>
  );
};
