
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hotel, Calendar, CreditCard, BarChart3, MessageSquare, Megaphone, Heart, Filter, Users, TrendingUp, ImageIcon, FileText, Clock, Plus, Camera, Languages, Package } from "lucide-react";
import { HotelStarfield } from "@/components/hotels/HotelStarfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  id: "translations",
  name: "Translations",
  icon: Languages,
  path: "/panel-fernando/translations",
  description: "Manage hotel translations"
}, {
  id: "batches",
  name: "Batches",
  icon: Package,
  path: "/panel-fernando/batches",
  description: "Batch operations and tools"
}];

export default function PanelFernandoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  return <div className="min-h-screen relative flex flex-col">
      <HotelStarfield />
      <Navbar />
      <div className="flex flex-1 pt-16">
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
                      ${isActive ? 'bg-purple-800 text-white border-r-2 border-purple-300' : 'text-white hover:bg-purple-700'}
                    `}>
                    <Icon className="w-5 h-5 mr-3 text-white" />
                    <div className="flex-1">
                      <div className="font-medium text-white">{tab.name}</div>
                      <div className="text-xs text-white opacity-90">{tab.description}</div>
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
      <Footer />
    </div>;
}
