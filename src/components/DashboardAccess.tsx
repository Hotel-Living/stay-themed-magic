
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, User } from 'lucide-react';

export function DashboardAccess() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        <Link
          to="/hotel-dashboard"
          className="flex items-center gap-2 py-3 px-4 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium transition-colors shadow-lg"
          title="Access Hotel Dashboard"
        >
          <Building className="w-5 h-5" />
          <span>Hotel Dashboard</span>
        </Link>
        
        <Link
          to="/user-dashboard"
          className="flex items-center gap-2 py-3 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors shadow-lg"
          title="Access User Dashboard"
        >
          <User className="w-5 h-5" />
          <span>User Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
