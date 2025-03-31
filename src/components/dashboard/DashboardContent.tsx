
import { Link } from "react-router-dom";
import { PlusCircle, FileText, HelpCircle } from "lucide-react";
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
  
  return (
    <>
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Properties" value="2" change="+1" />
          <StatCard title="Total Bookings" value="28" change="+4" />
          <StatCard title="This Month Revenue" value="$4,580" change="+12%" />
          <Link 
            to="/add-property" 
            className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg p-4 hover:bg-fuchsia-900/30 transition-colors"
          >
            <span className="text-fuchsia-300 font-medium">+ A Property</span>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            <BookingItem 
              name="Emma Thompson" 
              dates="Nov 15 - Nov 23" 
              property="Parador de Granada"
              status="confirmed"
            />
            <BookingItem 
              name="Michael Chen" 
              dates="Dec 5 - Dec 21" 
              property="TechHub Barcelona"
              status="pending"
            />
            <BookingItem 
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
            title="+ A Property" 
            description="List a new hotel property" 
            icon={<PlusCircle className="w-5 h-5" />}
            onClick={() => window.location.href = '/add-property'}
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
