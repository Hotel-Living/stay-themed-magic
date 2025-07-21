import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { VideoTestimonialProvider } from "@/context/VideoTestimonialContext";
import { AvatarManagerProvider } from "@/context/AvatarManagerContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SEOMetadata } from "@/components/SEOMetadata";

// Import all pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HotelLogin from "./pages/HotelLogin";
import HotelSignup from "./pages/HotelSignup";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmEmail from "./pages/ConfirmEmail";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import AssociationDashboard from "./pages/AssociationDashboard";
import Payments from "./pages/Payments";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cities from "./pages/Cities";
import CityDetail from "./pages/CityDetail";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Search from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import TravelGuide from "./pages/TravelGuide";
import TravelGuideDetail from "./pages/TravelGuideDetail";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import PromoterDashboard from "./pages/PromoterDashboard";
import AdminRoutes from "./pages/AdminRoutes";
import DashboardSelection from "./pages/DashboardSelection";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Reviews from "./pages/Reviews";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Feedback from "./pages/Feedback";
import Avatars from "./pages/Avatars";
import VideoTestimonials from "./pages/VideoTestimonials";
import UserManagement from "./pages/UserManagement";
import DashboardGenerator from "./pages/DashboardGenerator";
import BrandAssets from "./pages/BrandAssets";
import TestEmail from "./pages/TestEmail";
import VideoTestimonialsManagement from "./pages/VideoTestimonialsManagement";
import AITravelAssistant from "./pages/AITravelAssistant";
import TestimonialForm from "./pages/TestimonialForm";
import ItineraryGenerator from "./pages/ItineraryGenerator";
import TravelInsights from "./pages/TravelInsights";
import TripPlanner from "./pages/TripPlanner";
import TravelAssistant from "./pages/TravelAssistant";
import ContentManagement from "./pages/ContentManagement";
import ExperiencesForm from "./pages/ExperiencesForm";
import Recommendations from "./pages/Recommendations";
import GlobalTestimonials from "./pages/GlobalTestimonials";
import TravelJournal from "./pages/TravelJournal";
import TravelStats from "./pages/TravelStats";
import BucketList from "./pages/BucketList";
import TravelMemories from "./pages/TravelMemories";
import TravelSocial from "./pages/TravelSocial";
import TravelChallenges from "./pages/TravelChallenges";
import TravelRewards from "./pages/TravelRewards";
import TravelCalendar from "./pages/TravelCalendar";
import TravelBudget from "./pages/TravelBudget";
import TravelExpenses from "./pages/TravelExpenses";
import TravelMaps from "./pages/TravelMaps";
import TravelWeather from "./pages/TravelWeather";
import TravelCurrency from "./pages/TravelCurrency";
import TravelTranslator from "./pages/TravelTranslator";
import TravelEmergency from "./pages/TravelEmergency";
import TravelHealth from "./pages/TravelHealth";
import TravelSafety from "./pages/TravelSafety";
import TravelDocuments from "./pages/TravelDocuments";
import TravelInsurance from "./pages/TravelInsurance";
import TravelChecklist from "./pages/TravelChecklist";
import TravelPacking from "./pages/TravelPacking";
import TravelTips from "./pages/TravelTips";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <AuthProvider>
            <VideoTestimonialProvider>
              <AvatarManagerProvider>
              <SEOMetadata />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/hotel-login" element={<HotelLogin />} />
                <Route path="/hotel-signup" element={<HotelSignup />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/confirm" element={<ConfirmEmail />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/hoteles" element={<Hotels />} />
                <Route path="/hoteles/:id" element={<HotelDetail />} />
                <Route path="/experiencias" element={<Experiences />} />
                <Route path="/experiencias/:id" element={<ExperienceDetail />} />
                <Route path="/reservas/:id" element={<BookingConfirmation />} />
                <Route path="/mis-reservas" element={<MyBookings />} />
                <Route path="/panel-asociacion" element={<AssociationDashboard />} />
                <Route path="/pagos" element={<Payments />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/eventos/:id" element={<EventDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/ciudades" element={<Cities />} />
                <Route path="/ciudades/:id" element={<CityDetail />} />
                <Route path="/destinos" element={<Destinations />} />
                <Route path="/destinos/:id" element={<DestinationDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:query" element={<SearchResults />} />
                <Route path="/travel-guide" element={<TravelGuide />} />
                <Route path="/travel-guide/:id" element={<TravelGuideDetail />} />
                <Route path="/galeria" element={<Gallery />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/noticias/:id" element={<NewsDetail />} />
                <Route path="/paquetes" element={<Packages />} />
                <Route path="/paquetes/:id" element={<PackageDetail />} />

                {/* Protected routes with role-based access */}
                
                {/* Traveler/User Dashboard - Protected for travelers */}
                <Route path="/user-dashboard" element={
                  <ProtectedRoute requireTraveler={true}>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Hotel Owner Dashboard - Protected for hotel owners */}
                <Route path="/hotel-dashboard" element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Association Dashboard - Protected for association users */}
                <Route path="/panel-asociacion" element={
                  <ProtectedRoute requireAssociation={true}>
                    <AssociationDashboard />
                  </ProtectedRoute>
                } />
                
                {/* Promoter Dashboard - Protected for promoters */}
                <Route path="/promoter/dashboard" element={
                  <ProtectedRoute requirePromoter={true}>
                    <PromoterDashboard />
                  </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminRoutes />
                  </ProtectedRoute>
                } />

                {/* Dashboard selection for users with multiple roles */}
                <Route path="/dashboard-selection" element={
                  <ProtectedRoute>
                    <DashboardSelection />
                  </ProtectedRoute>
                } />

                {/* Other protected routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <Bookings />
                  </ProtectedRoute>
                } />
                <Route path="/reviews" element={
                  <ProtectedRoute>
                    <Reviews />
                  </ProtectedRoute>
                } />
                <Route path="/help" element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/feedback" element={
                  <ProtectedRoute>
                    <Feedback />
                  </ProtectedRoute>
                } />
                <Route path="/avatars" element={
                  <ProtectedRoute>
                    <Avatars />
                  </ProtectedRoute>
                } />
                <Route path="/video-testimonials" element={
                  <ProtectedRoute>
                    <VideoTestimonials />
                  </ProtectedRoute>
                } />
                <Route path="/user-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <UserManagement />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard-generator" element={
                  <ProtectedRoute requireAdmin={true}>
                    <DashboardGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/brand-assets" element={
                  <ProtectedRoute requireAdmin={true}>
                    <BrandAssets />
                  </ProtectedRoute>
                } />
                <Route path="/test-email" element={
                  <ProtectedRoute requireAdmin={true}>
                    <TestEmail />
                  </ProtectedRoute>
                } />
                <Route path="/video-testimonials-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <VideoTestimonialsManagement />
                  </ProtectedRoute>
                } />
                <Route path="/ai-travel-assistant" element={
                  <ProtectedRoute>
                    <AITravelAssistant />
                  </ProtectedRoute>
                } />
                <Route path="/testimonial-form" element={
                  <ProtectedRoute>
                    <TestimonialForm />
                  </ProtectedRoute>
                } />
                <Route path="/itinerary-generator" element={
                  <ProtectedRoute>
                    <ItineraryGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/travel-insights" element={
                  <ProtectedRoute>
                    <TravelInsights />
                  </ProtectedRoute>
                } />
                <Route path="/trip-planner" element={
                  <ProtectedRoute>
                    <TripPlanner />
                  </ProtectedRoute>
                } />
                <Route path="/travel-assistant" element={
                  <ProtectedRoute>
                    <TravelAssistant />
                  </ProtectedRoute>
                } />
                <Route path="/content-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <ContentManagement />
                  </ProtectedRoute>
                } />
                <Route path="/experiences-form" element={
                  <ProtectedRoute>
                    <ExperiencesForm />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations" element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                } />
                <Route path="/global-testimonials" element={
                  <ProtectedRoute>
                    <GlobalTestimonials />
                  </ProtectedRoute>
                } />
                <Route path="/travel-journal" element={
                  <ProtectedRoute>
                    <TravelJournal />
                  </ProtectedRoute>
                } />
                <Route path="/travel-stats" element={
                  <ProtectedRoute>
                    <TravelStats />
                  </ProtectedRoute>
                } />
                <Route path="/bucket-list" element={
                  <ProtectedRoute>
                    <BucketList />
                  </ProtectedRoute>
                } />
                <Route path="/travel-memories" element={
                  <ProtectedRoute>
                    <TravelMemories />
                  </ProtectedRoute>
                } />
                <Route path="/travel-social" element={
                  <ProtectedRoute>
                    <TravelSocial />
                  </ProtectedRoute>
                } />
                <Route path="/travel-challenges" element={
                  <ProtectedRoute>
                    <TravelChallenges />
                  </ProtectedRoute>
                } />
                <Route path="/travel-rewards" element={
                  <ProtectedRoute>
                    <TravelRewards />
                  </ProtectedRoute>
                } />
                <Route path="/travel-calendar" element={
                  <ProtectedRoute>
                    <TravelCalendar />
                  </ProtectedRoute>
                } />
                <Route path="/travel-budget" element={
                  <ProtectedRoute>
                    <TravelBudget />
                  </ProtectedRoute>
                } />
                <Route path="/travel-expenses" element={
                  <ProtectedRoute>
                    <TravelExpenses />
                  </ProtectedRoute>
                } />
                <Route path="/travel-maps" element={
                  <ProtectedRoute>
                    <TravelMaps />
                  </ProtectedRoute>
                } />
                <Route path="/travel-weather" element={
                  <ProtectedRoute>
                    <TravelWeather />
                  </ProtectedRoute>
                } />
                <Route path="/travel-currency" element={
                  <ProtectedRoute>
                    <TravelCurrency />
                  </ProtectedRoute>
                } />
                <Route path="/travel-translator" element={
                  <ProtectedRoute>
                    <TravelTranslator />
                  </ProtectedRoute>
                } />
                <Route path="/travel-emergency" element={
                  <ProtectedRoute>
                    <TravelEmergency />
                  </ProtectedRoute>
                } />
                <Route path="/travel-health" element={
                  <ProtectedRoute>
                    <TravelHealth />
                  </ProtectedRoute>
                } />
                <Route path="/travel-safety" element={
                  <ProtectedRoute>
                    <TravelSafety />
                  </ProtectedRoute>
                } />
                <Route path="/travel-documents" element={
                  <ProtectedRoute>
                    <TravelDocuments />
                  </ProtectedRoute>
                } />
                <Route path="/travel-insurance" element={
                  <ProtectedRoute>
                    <TravelInsurance />
                  </ProtectedRoute>
                } />
                <Route path="/travel-checklist" element={
                  <ProtectedRoute>
                    <TravelChecklist />
                  </ProtectedRoute>
                } />
                <Route path="/travel-packing" element={
                  <ProtectedRoute>
                    <TravelPacking />
                  </ProtectedRoute>
                } />
                <Route path="/travel-tips" element={
                  <ProtectedRoute>
                    <TravelTips />
                  </ProtectedRoute>
                } />
              </Routes>
            <GlobalTestimonials />
            </AvatarManagerProvider>
            </VideoTestimonialProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
