import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  BookOpen, 
  Building, 
  Calendar, 
  CreditCard, 
  Calculator,
  PlusCircle,
  FileText,
  HelpCircle,
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  Settings, 
  Users,
  MapPin,
  Image,
  Upload,
  BedDouble,
  Calendar as CalendarIcon,
  Hash,
  Utensils,
  Clock,
  Tag,
  Hotel,
  Paintbrush,
  ListChecks,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import dashboard components
import StatCard from "@/components/dashboard/StatCard";
import BookingItem from "@/components/dashboard/BookingItem";
import ReviewItem from "@/components/dashboard/ReviewItem";
import ActionCard from "@/components/dashboard/ActionCard";
import PropertiesContent from "@/components/dashboard/PropertiesContent";
import BookingsContent from "@/components/dashboard/BookingsContent";
import GuestsContent from "@/components/dashboard/GuestsContent";
import AnalyticsContent from "@/components/dashboard/AnalyticsContent";
import ReviewsContent from "@/components/dashboard/ReviewsContent";
import FinancesContent from "@/components/dashboard/FinancesContent";
import SettingsContent from "@/components/dashboard/SettingsContent";

interface DashboardTab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  const tabs: DashboardTab[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "calculator", label: "Hotel-Living Calculator", icon: <Calculator className="w-5 h-5" /> },
    { id: "addProperty", label: "+ A Property", icon: <PlusCircle className="w-5 h-5" /> },
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
                      data-tab={tab.id}
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
              {activeTab === "calculator" && <CalculatorContent />}
              {activeTab === "addProperty" && <AddPropertyContent />}
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
            to="/hotel-dashboard/add-property" 
            className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg p-4 hover:bg-fuchsia-900/30 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handlePropertyTabClick();
            }}
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
            onClick={handlePropertyTabClick}
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

function CalculatorContent() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-6">Hotel-Living Calculator</h2>
      <p className="text-foreground/80 mb-4">Calculate potential revenue and occupancy for your properties.</p>
      <div className="text-center py-20 text-muted-foreground">
        <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Calculator coming soon...</p>
      </div>
    </div>
  );
}

function AddPropertyContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Add a New Property</h2>
        <div className="text-sm text-foreground/60">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-fuchsia-950/50 rounded-full h-2 mb-6">
        <div 
          className="bg-fuchsia-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      {/* Step Content */}
      <div className="mb-8">
        {currentStep === 1 && <BasicInfoStep />}
        {currentStep === 2 && <LocationStep />}
        {currentStep === 3 && <PicturesStep />}
        {currentStep === 4 && <RoomsAndPricingStep />}
        {currentStep === 5 && <ThemesAndActivitiesStep />}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousStep}
          className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
            currentStep === 1 
              ? "bg-fuchsia-800/20 text-fuchsia-300/50 cursor-not-allowed" 
              : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          }`}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep === totalSteps ? (
          <button
            className="rounded-lg px-6 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            Submit Property
          </button>
        ) : (
          <button
            onClick={goToNextStep}
            className="rounded-lg px-6 py-2 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function BasicInfoStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Hotel Name
        </label>
        <input 
          type="text" 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
          placeholder="Enter hotel name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Category
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
          <option value="">Select hotel category</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
          <option value="nr">Not Rated</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Type of Property
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
          <option value="">Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="boutique">Hotel Boutique</option>
          <option value="resort">Resort</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Style of Property
        </label>
        <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
          <option value="">Select property style</option>
          <option value="classic">Classic</option>
          <option value="classic-elegant">Classic Elegant</option>
          <option value="design">Design</option>
          <option value="modern">Modern</option>
          <option value="countryside">Countryside</option>
          <option value="urban">Urban</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Hotel Description
        </label>
        <textarea 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[120px]"
          placeholder="Enter a detailed description of your hotel"
        ></textarea>
      </div>
    </div>
  );
}

function LocationStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Location Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Address
        </label>
        <input 
          type="text" 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30"
          placeholder="Street address"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Country
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select country</option>
            <option value="es">Spain</option>
            <option value="fr">France</option>
            <option value="it">Italy</option>
            <option value="us">United States</option>
            <option value="other">Other countries...</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            City
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select city</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
            <option value="valencia">Valencia</option>
            <option value="seville">Seville</option>
            <option value="other">Add new city...</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Location on Map
        </label>
        <div className="w-full h-64 bg-fuchsia-950/30 rounded-lg border border-fuchsia-800/30 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-fuchsia-400/50" />
            <p className="text-sm text-foreground/60">Google Maps will be loaded here</p>
            <p className="text-xs text-foreground/40 mt-1">Latitude and longitude will be set automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PicturesStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Property Pictures</h3>
      
      <div className="bg-fuchsia-950/30 p-8 rounded-lg border border-dashed border-fuchsia-800/40 text-center">
        <Upload className="w-12 h-12 mx-auto mb-4 text-fuchsia-400/50" />
        <p className="text-foreground/90 font-medium mb-1">Drag & drop photos here</p>
        <p className="text-sm text-foreground/60 mb-4">or click to browse from your device</p>
        <button className="inline-flex items-center px-4 py-2 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors">
          <Image className="w-4 h-4 mr-2" /> Upload Photos
        </button>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Uploaded Photos
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="relative bg-fuchsia-950/50 rounded-lg aspect-[4/3] overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
                <Image className="w-8 h-8" />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors mr-2">
                  <Star className="w-4 h-4 text-amber-400" />
                </button>
                <button className="p-1.5 rounded-full bg-red-500/30 hover:bg-red-500/50 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center bg-fuchsia-950/30 rounded-lg aspect-[4/3] border border-dashed border-fuchsia-800/40">
            <button className="p-2 rounded-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
              <PlusCircle className="w-6 h-6 text-fuchsia-300" />
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-foreground/50">
          <span className="text-fuchsia-300">★</span> Select a photo as the main image
        </div>
      </div>
    </div>
  );
}

function RoomsAndPricingStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Rooms & Pricing</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Length of Stays
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { days: 8, label: "8 days" },
              { days: 16, label: "16 days" },
              { days: 24, label: "24 days" },
              { days: 32, label: "32 days" }
            ].map((option) => (
              <label key={option.days} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Meals
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select meal option</option>
            <option value="none">No meals</option>
            <option value="breakfast">Breakfast</option>
            <option value="halfboard">Half Board</option>
            <option value="fullboard">Full Board</option>
            <option value="allinclusive">All Inclusive</option>
            <option value="allinclusive-laundry">All Inclusive (Laundry Included)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1">
            Weekday for Check-in/Out
          </label>
          <select className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30">
            <option value="">Select weekday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-fuchsia-900/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Room Types</h4>
          <button className="inline-flex items-center text-sm px-3 py-1.5 rounded-lg bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white transition-colors">
            <PlusCircle className="w-4 h-4 mr-1.5" /> Add Room Type
          </button>
        </div>
        
        <div className="bg-fuchsia-950/40 rounded-lg p-4 border border-fuchsia-800/20 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <BedDouble className="w-5 h-5 mr-2 text-fuchsia-300" />
              <h5 className="font-semibold">Double Room</h5>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-lg bg-fuchsia-500/20 hover:bg-fuchsia-500/30 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2 2 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-2">
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Rooms:</span>
              <span className="font-medium">10</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Adults:</span>
              <span className="font-medium">2</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1.5 text-foreground/60" />
              <span className="text-foreground/60 mr-1">Footage:</span>
              <span className="font-medium">25 m²</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="text-xs px-3 py-1 rounded-lg bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-foreground/80 transition-colors">
              View Prices
            </button>
          </div>
        </div>
        
        <div className="text-center py-4 text-foreground/50 text-sm border border-dashed border-fuchsia-800/20 rounded-lg">
          Add room types to configure pricing options
        </div>
      </div>
    </div>
  );
}

function ThemesAndActivitiesStep() {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold mb-4">Themes & Features</h3>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Themes
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Luxury", "Beach", "Urban", "Historic", "Nature", "Food & Wine"].map((theme) => (
            <label key={theme} className="flex items-start">
              <input 
                type="checkbox" 
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm">{theme}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Hotel Features
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Free WiFi", "Parking", "Restaurant", "Pool", "Spa", "Gym", "24/7 Reception", "Room Service"].map((feature) => (
            <label key={feature} className="flex items-start">
              <input 
                type="checkbox" 
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
              />
              <span className="text-sm">{feature}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Activities
        </label>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">On Premises</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Dancing", "Concerts", "Courses", "Games", "Theater", "Spa"].map((activity) => (
                <label key={activity} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{activity}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-fuchsia-950/30 rounded-lg p-4 border border-fuchsia-800/30">
            <h4 className="font-medium mb-3">At Nearby Locations</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["Beach", "Hiking", "Concerts", "Shopping", "Museums", "Sports"].map((activity) => (
                <label key={activity} className="flex items-start">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
                  />
                  <span className="text-sm">{activity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
