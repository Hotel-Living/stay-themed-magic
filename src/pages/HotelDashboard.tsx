import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  BookOpen, 
  Building, 
  Calendar, 
  CreditCard, 
  Edit, 
  FileText,
  HelpCircle,
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  PlusCircle,
  Settings, 
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "properties", label: "My Properties", icon: <Building className="w-5 h-5" /> },
    { id: "bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "guests", label: "Guests", icon: <Users className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "reviews", label: "Reviews", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "finances", label: "Finances", icon: <CreditCard className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Hotel Management</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <div className="p-6 text-center border-b border-fuchsia-900/20">
                  <div className="w-20 h-20 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="w-10 h-10 text-fuchsia-300" />
                  </div>
                  <h2 className="font-bold mb-1">Hotel Partner</h2>
                  <p className="text-sm text-muted-foreground">Verified Account</p>
                </div>
                
                <nav className="p-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === tab.id
                          ? "bg-fuchsia-500/20 text-fuchsia-200"
                          : "hover:bg-fuchsia-500/10 text-foreground/80"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                  
                  <div className="px-4 py-3">
                    <div className="h-px bg-fuchsia-900/20 my-2"></div>
                  </div>
                  
                  <Link
                    to="/login"
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 hover:bg-fuchsia-500/10 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Log Out
                  </Link>
                </nav>
              </div>
              
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <h3 className="font-bold">Need Help?</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-4">
                  Our support team is available 24/7 to assist you with any questions.
                </p>
                <button className="w-full py-2 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
                  Contact Support
                </button>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "dashboard" && <HotelDashboardContent />}
              {activeTab === "properties" && <PropertiesContent />}
              {activeTab === "bookings" && <BookingsContent />}
              {activeTab === "guests" && <GuestsContent />}
              {activeTab === "analytics" && <AnalyticsContent />}
              {activeTab === "reviews" && <ReviewsContent />}
              {activeTab === "finances" && <FinancesContent />}
              {activeTab === "settings" && <SettingsContent />}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary py-6 px-4 border-t border-fuchsia-900/20 mt-10">
        <div className="container max-w-6xl mx-auto text-center text-sm text-foreground/60">
          &copy; {new Date().getFullYear()} Hotel-Living.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function HotelDashboardContent() {
  return (
    <>
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Active Properties" value="2" change="+1" />
          <StatCard title="Total Bookings" value="28" change="+4" />
          <StatCard title="This Month Revenue" value="$4,580" change="+12%" />
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
            title="Add Property" 
            description="List a new hotel property" 
            icon={<PlusCircle className="w-5 h-5" />}
          />
          <ActionCard 
            title="View Bookings" 
            description="Manage upcoming reservations" 
            icon={<BookOpen className="w-5 h-5" />}
          />
          <ActionCard 
            title="Edit Themes" 
            description="Update your hotel themes" 
            icon={<Edit className="w-5 h-5" />}
          />
          <ActionCard 
            title="Pricing Settings" 
            description="Adjust your monthly rates" 
            icon={<CreditCard className="w-5 h-5" />}
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

function PropertiesContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">My Properties</h2>
        <button className="flex items-center gap-2 rounded-lg px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
          <PlusCircle className="w-4 h-4" />
          Add Property
        </button>
      </div>
      
      <div className="space-y-6">
        <PropertyCard 
          name="Parador de Granada"
          location="Granada, Spain"
          themes={["Languages Learning", "Languages Practicing", "International Cooking Classes"]}
          status="active"
        />
        <PropertyCard 
          name="TechHub Barcelona"
          location="Barcelona, Spain"
          themes={["Coding Bootcamp", "Robotics Workshop", "AI & Machine Learning"]}
          status="active"
        />
      </div>
    </div>
  );
}

function BookingsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Bookings Management</h2>
      <p className="text-foreground/80">Manage all your hotel bookings and reservations here.</p>
      {/* More booking content would go here */}
    </div>
  );
}

function GuestsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Guests</h2>
      <p className="text-foreground/80">View and manage your hotel guests.</p>
      {/* More guests content would go here */}
    </div>
  );
}

function AnalyticsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Analytics</h2>
      <p className="text-foreground/80">View your hotel analytics.</p>
      {/* More analytics content would go here */}
    </div>
  );
}

function ReviewsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Reviews</h2>
      <p className="text-foreground/80">View and manage your hotel reviews.</p>
      {/* More reviews content would go here */}
    </div>
  );
}

function FinancesContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Finances</h2>
      <p className="text-foreground/80">View and manage your hotel finances.</p>
      {/* More finances content would go here */}
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Hotel Settings</h2>
      <p className="text-foreground/80">Configure your hotel profile, payment details, and preferences.</p>
      {/* More settings content would go here */}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
}

function StatCard({ title, value, change }: StatCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="bg-fuchsia-950/30 rounded-lg p-4">
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold">{value}</p>
        <span className={cn(
          "text-sm px-2 py-0.5 rounded",
          isPositive 
            ? "text-green-500 bg-green-500/10" 
            : "text-red-500 bg-red-500/10"
        )}>
          {change}
        </span>
      </div>
    </div>
  );
}

interface BookingItemProps {
  name: string;
  dates: string;
  property: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

function BookingItem({ name, dates, property, status }: BookingItemProps) {
  const statusColors = {
    confirmed: "text-green-500 bg-green-500/10",
    pending: "text-amber-500 bg-amber-500/10",
    cancelled: "text-red-500 bg-red-500/10",
  };
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-fuchsia-950/30">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{dates}</p>
        <p className="text-xs text-fuchsia-400">{property}</p>
      </div>
      <span className={cn(
        "text-xs px-2 py-1 rounded capitalize",
        statusColors[status]
      )}>
        {status}
      </span>
    </div>
  );
}

interface ReviewItemProps {
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
}

function ReviewItem({ name, rating, property, comment, date }: ReviewItemProps) {
  return (
    <div className="p-3 rounded-lg bg-fuchsia-950/30">
      <div className="flex items-center justify-between mb-2">
        <p className="font-medium">{name}</p>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "w-4 h-4", 
                i < rating 
                  ? "fill-amber-400 text-amber-400" 
                  : "text-gray-400"
              )} 
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-fuchsia-400 mb-1">{property}</p>
      <p className="text-sm text-foreground/80 line-clamp-2 mb-1">{comment}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function ActionCard({ title, description, icon }: ActionCardProps) {
  return (
    <div className="bg-fuchsia-950/30 rounded-lg p-4 hover:bg-fuchsia-900/30 transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

interface PropertyCardProps {
  name: string;
  location: string;
  themes: string[];
  status: 'active' | 'inactive' | 'pending';
}

function PropertyCard({ name, location, themes, status }: PropertyCardProps) {
  const statusColors = {
    active: "text-green-500 bg-green-500/10",
    inactive: "text-gray-500 bg-gray-500/10",
    pending: "text-amber-500 bg-amber-500/10",
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg bg-fuchsia-950/30">
      <div className="md:w-1/4">
        <img 
          src="/placeholder.svg" 
          alt={name}
          className="w-full h-32 md:h-full object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
          <span className={cn(
            "text-xs px-2 py-1 rounded capitalize",
            statusColors[status]
          )}>
            {status}
          </span>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-fuchsia-400 mb-1">Themes</p>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 transition-colors">
            Edit
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground/80 transition-colors">
            View Bookings
          </button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground/80 transition-colors">
            Manage Themes
          </button>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}
