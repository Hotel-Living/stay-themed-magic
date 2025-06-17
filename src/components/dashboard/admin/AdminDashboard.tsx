
import React, { useState } from 'react';
import AdminUsersPanel from './AdminUsersPanel';
import AdminBookingsPanel from './AdminBookingsPanel';
import AdminPaymentsPanel from './AdminPaymentsPanel';
import AffinitiesPanel from './affinities/AffinitiesPanel';
import AdminFiltersPanel from './AdminFiltersPanel';
import ActivitiesPanel from "./activities/ActivitiesPanel";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <div className="text-white">Admin Overview Content</div>;
      case 'hotels':
        return <div className="text-white">Hotels management will be available soon</div>;
      case 'users':
        return <AdminUsersPanel />;
      case 'bookings':
        return <AdminBookingsPanel />;
      case 'payments':
        return <AdminPaymentsPanel />;
      case 'affinities':
        return <AffinitiesPanel />;
      case 'activities':
        return <ActivitiesPanel />;
      case 'filters':
        return <AdminFiltersPanel />;
      default:
        return <div className="text-white">Select a tab from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-fuchsia-900">
      <div className="flex">
        <div className="w-64 bg-purple-800/30 min-h-screen p-4">
          <h2 className="text-xl font-bold text-white mb-6">Admin Panel</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'hotels' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Hotels
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'bookings' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'payments' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab('affinities')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'affinities' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Affinities
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'activities' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Activities
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeTab === 'filters' ? 'bg-purple-600 text-white' : 'text-purple-200 hover:bg-purple-700/50'
              }`}
            >
              Filters
            </button>
          </nav>
        </div>
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
