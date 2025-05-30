
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import Home from "@/pages/Index";
import Hotels from "@/pages/Hotels";
import HotelDetail from "@/pages/HotelDetail";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import UserDashboard from "@/pages/UserDashboard";
import HotelDashboard from "@/pages/HotelDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import HotelRegistration from "@/pages/HotelSignUp";
import FeaturedHotels from "@/pages/FeaturedHotels";
import Videos from "@/pages/Videos";
import AffinityStays from "@/pages/AffinityStays";
import FAQ from "@/pages/FAQ";
import AdminRoles from "@/pages/AdminRoles";
import Search from "@/pages/Search";
import JoinUs from "@/pages/JoinUs";
import GTranslateWidget from "@/components/GTranslateWidget";

const queryClient = createQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen">
            <Toaster />
            <GTranslateWidget />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/join-us" element={<JoinUs />} />
              
              {/* Protected Routes */}
              <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/hotel-dashboard" element={<ProtectedRoute requireHotelOwner={true}><HotelDashboard /></ProtectedRoute>} />
              <Route path="/hotel-registration" element={<ProtectedRoute><HotelRegistration /></ProtectedRoute>} />
              <Route path="/featured-hotels" element={<FeaturedHotels />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/affinity-stays" element={<AffinityStays />} />
              <Route path="/faq" element={<FAQ />} />

              {/* Admin Routes */}
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/admin/roles" element={<AdminRoles />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
