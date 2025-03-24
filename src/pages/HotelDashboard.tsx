
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
  Star,
  BedDouble,
  Calendar as CalendarIcon,
  Hash,
  Utensils,
  Clock,
  Tag,
  Hotel,
  Paintbrush,
  ListChecks
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
              document.querySelector('button[data-tab="addProperty"]')?.click();
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
            onClick={() => document.querySelector('button[data-tab="addProperty"]')?.click()}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
          {[
            { id: "language", name: "Languages", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg> },
            { id: "culinary", name: "Culinary", icon: <Utensils className="w-4 h-4" /> },
            { id: "arts", name: "Arts & Crafts", icon: <Paintbrush className="w-4 h-4" /> },
            { id: "sports", name: "Sports & Fitness", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg> },
            { id: "tech", name: "Technology", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
            { id: "wellness", name: "Wellness", icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
          ].map((theme) => (
            <div key={theme.id} className="flex items-center justify-between bg-fuchsia-950/50 rounded-lg p-3 border border-fuchsia-800/20">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center mr-2.5">
                  {theme.icon}
                </div>
                <span className="font-medium">{theme.name}</span>
              </div>
              <svg className="w-5 h-5 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Activities
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="flex items-center text-sm font-medium mb-2">
              <Hotel className="w-4 h-4 mr-1.5" /> On Premises
            </h4>
            <div className="bg-fuchsia-950/50 rounded-lg border border-fuchsia-800/20 p-3">
              <div className="flex flex-wrap gap-2">
                {['Concerts', 'Courses', 'Games', 'Spa'].map((activity) => (
                  <div key={activity} className="flex items-center bg-fuchsia-900/30 px-2.5 py-1 rounded-md">
                    <span className="text-sm">{activity}</span>
                    <button className="ml-1.5 text-foreground/60 hover:text-foreground/90">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="text-fuchsia-300 hover:text-fuchsia-200 text-sm inline-flex items-center">
                  <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="flex items-center text-sm font-medium mb-2">
              <MapPin className="w-4 h-4 mr-1.5" /> On Another Premises
            </h4>
            <div className="bg-fuchsia-950/50 rounded-lg border border-fuchsia-800/20 p-3">
              <div className="flex flex-wrap gap-2">
                {['Beach', 'Hiking', 'Theater', 'Opera'].map((activity) => (
                  <div key={activity} className="flex items-center bg-fuchsia-900/30 px-2.5 py-1 rounded-md">
                    <span className="text-sm">{activity}</span>
                    <button className="ml-1.5 text-foreground/60 hover:text-foreground/90">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button className="text-fuchsia-300 hover:text-fuchsia-200 text-sm inline-flex items-center">
                  <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Hotel Features
        </label>
        <div className="bg-fuchsia-950/50 rounded-lg border border-fuchsia-800/20 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
            {[
              'Air Conditioning', 'Bar', 'Gym', 'Jacuzzi', 'Medical Service',
              'Parking', 'Pool', 'Restaurant', 'Spa', 'WiFi (Free)'
            ].map((feature) => (
              <label key={feature} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/70 h-4 w-4 mr-2" 
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
          <button className="text-fuchsia-300 hover:text-fuchsia-200 text-sm inline-flex items-center mt-3">
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Custom Feature
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-3">
          Room Features
        </label>
        <div className="bg-fuchsia-950/50 rounded-lg border border-fuchsia-800/20 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
            {[
              'Bathroom Amenities', 'Balcony with View', 'Bathrobe', 
              'Safety Box', 'Kitchenette', 'Coffee Kit', 'Minibar'
            ].map((feature) => (
              <label key={feature} className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/70 h-4 w-4 mr-2" 
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
          <button className="text-fuchsia-300 hover:text-fuchsia-200 text-sm inline-flex items-center mt-3">
            <PlusCircle className="w-3.5 h-3.5 mr-1" /> Add Custom Feature
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Availability
        </label>
        <div className="bg-fuchsia-950/50 rounded-lg border border-fuchsia-800/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-4">
              <button className="text-lg font-semibold">2025</button>
              <button className="text-lg font-semibold text-foreground/50 hover:text-foreground/80">2026</button>
            </div>
            <button className="text-sm text-fuchsia-300 hover:text-fuchsia-200">
              Select All Mondays
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
              <div key={month} className="flex items-center justify-between bg-fuchsia-950/80 rounded-lg p-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
                  />
                  <span className="text-sm">{month}</span>
                </div>
                <button className="text-foreground/60 hover:text-foreground/90">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 bg-fuchsia-950/80 rounded-lg p-4 border border-fuchsia-800/20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1.5" /> August 2025
              </h4>
              <div className="text-xs text-foreground/60">
                Only Mondays selectable
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              <div className="text-foreground/50">Mon</div>
              <div className="text-foreground/30">Tue</div>
              <div className="text-foreground/30">Wed</div>
              <div className="text-foreground/30">Thu</div>
              <div className="text-foreground/30">Fri</div>
              <div className="text-foreground/30">Sat</div>
              <div className="text-foreground/30">Sun</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const isMonday = (day - 5) % 7 === 0;
                return (
                  <div 
                    key={day}
                    className={`h-8 flex items-center justify-center rounded-md text-sm ${
                      isMonday 
                        ? 'bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-white cursor-pointer' 
                        : 'text-foreground/20'
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          FAQ
        </label>
        <textarea 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[100px]"
          placeholder="Add frequently asked questions for your property"
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1">
          Terms and Conditions
        </label>
        <textarea 
          className="w-full p-2.5 rounded-lg bg-fuchsia-950/50 border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[100px]"
          placeholder="Add terms and conditions for your property"
        ></textarea>
      </div>
    </div>
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
  onClick?: () => void;
}

function ActionCard({ title, description, icon, onClick }: ActionCardProps) {
  return (
    <div 
      className="bg-fuchsia-950/30 rounded-lg p-4 hover:bg-fuchsia-900/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
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
