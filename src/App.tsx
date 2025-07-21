import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { VideoTestimonialProvider } from "@/contexts/VideoTestimonialContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SEOMetadata } from "@/components/SEOMetadata";

// Import only existing pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import HotelDetail from "./pages/HotelDetail";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import PromoterDashboard from "./pages/PromoterDashboard";
import AssociationDashboard from "./pages/AssociationDashboard";

// Simple placeholder component for missing pages
const NotImplemented = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Page Not Yet Implemented</h1>
      <p className="text-muted-foreground">This page is under development.</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <AuthProvider>
            <VideoTestimonialProvider>
              <SEOMetadata />
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/hoteles/:id" element={<HotelDetail />} />
                
                {/* Placeholder routes for missing pages */}
                <Route path="/signup" element={<NotImplemented />} />
                <Route path="/hotel-login" element={<NotImplemented />} />
                <Route path="/hotel-signup" element={<NotImplemented />} />
                <Route path="/verify-email" element={<NotImplemented />} />
                <Route path="/reset-password" element={<NotImplemented />} />
                <Route path="/forgot-password" element={<NotImplemented />} />
                <Route path="/confirm" element={<NotImplemented />} />
                <Route path="/terms" element={<NotImplemented />} />
                <Route path="/privacy" element={<NotImplemented />} />
                <Route path="/contact" element={<NotImplemented />} />
                <Route path="/hoteles" element={<NotImplemented />} />
                <Route path="/experiencias" element={<NotImplemented />} />
                <Route path="/experiencias/:id" element={<NotImplemented />} />
                <Route path="/reservas/:id" element={<NotImplemented />} />
                <Route path="/mis-reservas" element={<NotImplemented />} />
                <Route path="/pagos" element={<NotImplemented />} />
                <Route path="/eventos" element={<NotImplemented />} />
                <Route path="/eventos/:id" element={<NotImplemented />} />
                <Route path="/blog" element={<NotImplemented />} />
                <Route path="/blog/:id" element={<NotImplemented />} />
                <Route path="/ciudades" element={<NotImplemented />} />
                <Route path="/ciudades/:id" element={<NotImplemented />} />
                <Route path="/destinos" element={<NotImplemented />} />
                <Route path="/destinos/:id" element={<NotImplemented />} />
                <Route path="/search" element={<NotImplemented />} />
                <Route path="/search/:query" element={<NotImplemented />} />
                <Route path="/travel-guide" element={<NotImplemented />} />
                <Route path="/travel-guide/:id" element={<NotImplemented />} />
                <Route path="/galeria" element={<NotImplemented />} />
                <Route path="/noticias" element={<NotImplemented />} />
                <Route path="/noticias/:id" element={<NotImplemented />} />
                <Route path="/paquetes" element={<NotImplemented />} />
                <Route path="/paquetes/:id" element={<NotImplemented />} />

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

                {/* Other protected routes - placeholder implementations */}
                <Route path="/admin/*" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />

                <Route path="/dashboard-selection" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/reviews" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/help" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/feedback" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/avatars" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/video-testimonials" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/user-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard-generator" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/brand-assets" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/test-email" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/video-testimonials-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/ai-travel-assistant" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/testimonial-form" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/itinerary-generator" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-insights" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/trip-planner" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-assistant" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/content-management" element={
                  <ProtectedRoute requireAdmin={true}>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/experiences-form" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/global-testimonials" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-journal" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-stats" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/bucket-list" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-memories" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-social" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-challenges" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-rewards" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-calendar" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-budget" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-expenses" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-maps" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-weather" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-currency" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-translator" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-emergency" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-health" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-safety" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-documents" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-insurance" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-checklist" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-packing" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                <Route path="/travel-tips" element={
                  <ProtectedRoute>
                    <NotImplemented />
                  </ProtectedRoute>
                } />
                
                {/* Catch all route */}
                <Route path="*" element={<NotImplemented />} />
              </Routes>
            </VideoTestimonialProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
