
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  CreditCard, 
  History, 
  LayoutDashboard, 
  LogOut, 
  Settings, 
  User, 
  ChevronRight,
  BellRing,
  Clock,
  CalendarCheck,
  Building,
  Star
} from "lucide-react";
import { hotels } from "@/utils/data";
import { cn } from "@/lib/utils";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "bookings", label: "My Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "history", label: "Stay History", icon: <History className="w-5 h-5" /> },
    { id: "saved", label: "Saved Hotels", icon: <Building className="w-5 h-5" /> },
    { id: "payments", label: "Payment Methods", icon: <CreditCard className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="glass-card rounded-2xl overflow-hidden mb-8">
                <div className="p-6 text-center border-b border-fuchsia-900/20">
                  <div className="w-20 h-20 bg-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-fuchsia-300" />
                  </div>
                  <h2 className="font-bold mb-1">Alex Johnson</h2>
                  <p className="text-sm text-muted-foreground">Premium Member</p>
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
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === "dashboard" && <DashboardContent />}
              {activeTab === "bookings" && <BookingsContent />}
              {activeTab === "history" && <HistoryContent />}
              {activeTab === "saved" && <SavedContent />}
              {activeTab === "payments" && <PaymentsContent />}
              {activeTab === "profile" && <ProfileContent />}
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

function DashboardContent() {
  const upcomingStay = {
    hotelId: hotels[0].id,
    hotelName: hotels[0].name,
    location: `${hotels[0].city}, ${hotels[0].country}`,
    checkIn: "2023-11-15",
    checkOut: "2023-11-23",
    days: 8,
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Upcoming Stay"
          value="1"
          icon={<Calendar className="w-6 h-6" />}
          color="fuchsia"
        />
        <DashboardCard 
          title="Completed Stays"
          value="3"
          icon={<CalendarCheck className="w-6 h-6" />}
          color="cyan"
        />
        <DashboardCard 
          title="Saved Hotels"
          value="5"
          icon={<Building className="w-6 h-6" />}
          color="amber"
        />
      </div>
      
      {/* Upcoming Stay */}
      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-fuchsia-900/20">
          <h2 className="text-xl font-bold">Upcoming Stay</h2>
        </div>
        
        <div className="p-6">
          {upcomingStay ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src="/placeholder.svg" 
                  alt={upcomingStay.hotelName}
                  className="w-full aspect-video object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{upcomingStay.hotelName}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-fuchsia-400 text-fuchsia-400" />
                    ))}
                  </div>
                  <span>{upcomingStay.location}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Check-in</p>
                    <p className="font-medium">Nov 15, 2023</p>
                  </div>
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Check-out</p>
                    <p className="font-medium">Nov 23, 2023</p>
                  </div>
                  <div className="bg-fuchsia-950/30 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">{upcomingStay.days} days</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg px-4 py-2 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="rounded-lg px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground/80 text-sm font-medium transition-colors">
                    Contact Hotel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-fuchsia-950/30 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-fuchsia-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">No upcoming stays</h3>
              <p className="text-muted-foreground mb-6">Book your next thematic hotel experience.</p>
              <Link 
                to="/"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-200 text-sm font-medium transition-colors"
              >
                Browse Hotels <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Activities */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-fuchsia-900/20">
          <h2 className="text-xl font-bold">Recent Activity</h2>
        </div>
        
        <div className="divide-y divide-fuchsia-900/10">
          <ActivityItem 
            icon={<Clock className="w-5 h-5" />}
            title="Booking confirmed"
            description="Your booking at Parador de Granada has been confirmed."
            time="2 days ago"
          />
          <ActivityItem 
            icon={<Star className="w-5 h-5" />}
            title="Review submitted"
            description="You submitted a review for TechHub Barcelona."
            time="1 week ago"
          />
          <ActivityItem 
            icon={<BellRing className="w-5 h-5" />}
            title="Reminder"
            description="Your stay at Villa Toscana is coming up in 2 weeks."
            time="2 weeks ago"
          />
        </div>
      </div>
    </div>
  );
}

function BookingsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">My Bookings</h2>
      <p className="text-foreground/80">View and manage your upcoming hotel bookings.</p>
      {/* Booking content would go here */}
    </div>
  );
}

function HistoryContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Stay History</h2>
      <p className="text-foreground/80">View your past stays and experiences.</p>
      {/* History content would go here */}
    </div>
  );
}

function SavedContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Saved Hotels</h2>
      <p className="text-foreground/80">View and manage your saved hotels.</p>
      {/* Saved hotels content would go here */}
    </div>
  );
}

function PaymentsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
      <p className="text-foreground/80">Manage your payment methods and billing information.</p>
      {/* Payment methods content would go here */}
    </div>
  );
}

function ProfileContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Profile</h2>
      <p className="text-foreground/80">Update your personal information and preferences.</p>
      {/* Profile content would go here */}
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <p className="text-foreground/80">Manage your account settings and preferences.</p>
      {/* Settings content would go here */}
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'fuchsia' | 'cyan' | 'amber';
}

function DashboardCard({ title, value, icon, color }: DashboardCardProps) {
  const colorClasses = {
    fuchsia: "from-fuchsia-500/20 to-fuchsia-900/20 text-fuchsia-300",
    cyan: "from-cyan-500/20 to-cyan-900/20 text-cyan-300",
    amber: "from-amber-500/20 to-amber-900/20 text-amber-300",
  };
  
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center",
          colorClasses[color]
        )}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}

function ActivityItem({ icon, title, description, time }: ActivityItemProps) {
  return (
    <div className="p-4 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  );
}
