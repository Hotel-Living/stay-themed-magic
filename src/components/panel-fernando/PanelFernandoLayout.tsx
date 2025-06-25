
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hotel, Calendar, CreditCard, BarChart3, MessageSquare, Megaphone, Heart, Filter, Users, TrendingUp, ImageIcon, FileText, Clock, Plus, Camera } from "lucide-react";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

const fernandoTabs = [{
  id: "32-day-hotels",
  name: "32-Day Hotels Creation",
  icon: Calendar,
  path: "/panel-fernando/32-day-hotels",
  description: "Create 69 hotels for 32-day stays"
}, {
  id: "hotels",
  name: "Hotels",
  icon: Hotel,
  path: "/panel-fernando/hotels",
  description: "Manage hotel listings"
}, {
  id: "bookings",
  name: "Bookings",
  icon: Calendar,
  path: "/panel-fernando/bookings",
  description: "View and manage bookings"
}, {
  id: "payments",
  name: "Payments",
  icon: CreditCard,
  path: "/panel-fernando/payments",
  description: "Payment management"
}, {
  id: "statistics",
  name: "Statistics",
  icon: BarChart3,
  path: "/panel-fernando/statistics",
  description: "View platform statistics"
}, {
  id: "communications",
  name: "Communications",
  icon: MessageSquare,
  path: "/panel-fernando/communications",
  description: "Manage communications"
}, {
  id: "advertising",
  name: "Advertising",
  icon: Megaphone,
  path: "/panel-fernando/advertising",
  description: "Advertising management"
}, {
  id: "affinities",
  name: "Affinities",
  icon: Heart,
  path: "/panel-fernando/affinities",
  description: "Manage affinities and themes"
}, {
  id: "filters",
  name: "Filters",
  icon: Filter,
  path: "/panel-fernando/filters",
  description: "Manage search filters"
}, {
  id: "user-roles",
  name: "User Roles",
  icon: Users,
  path: "/panel-fernando/user-roles",
  description: "Manage user roles"
}, {
  id: "analytics",
  name: "Analytics",
  icon: TrendingUp,
  path: "/panel-fernando/analytics",
  description: "Advanced analytics"
}, {
  id: "batch-images",
  name: "Batch Images",
  icon: ImageIcon,
  path: "/panel-fernando/batch-images",
  description: "Batch image operations"
}, {
  id: "batch-text-completion",
  name: "Batch Text Completion",
  icon: FileText,
  path: "/panel-fernando/batch-text",
  description: "Batch text completion"
}, {
  id: "batch-pending-fields",
  name: "Batch Pending Fields",
  icon: Clock,
  path: "/panel-fernando/batch-pending",
  description: "Process pending fields"
}, {
  id: "batch-hotel-creation",
  name: "Batch Hotel Creation",
  icon: Plus,
  path: "/panel-fernando/batch-create-hotels",
  description: "Create hotels in batches"
}, {
  id: "batch-room-images",
  name: "Batch Room Images",
  icon: Camera,
  path: "/panel-fernando/batch-room-images",
  description: "Batch room image operations"
}];

export default function PanelFernandoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  return <div className="min-h-screen relative">
      <HotelStarfield />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 shadow-lg border-r border-gray-200 bg-[#670e85]">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-white">Fernando Admin</h1>
            <p className="text-sm text-white">Management Panel</p>
          </div>
          
          <nav className="mt-6">
            <div className="px-3">
              {fernandoTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return <Link key={tab.id} to={tab.path} className={`
                      flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors
                      ${isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-white hover:bg-gray-50 hover:text-gray-900'}
                    `}>
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{tab.name}</div>
                      <div className="text-xs text-white">{tab.description}</div>
                    </div>
                  </Link>;
            })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>;
}
