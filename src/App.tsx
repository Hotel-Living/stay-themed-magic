import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Press from "@/pages/Press";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import UserDashboard from "@/pages/UserDashboard";
import HotelDashboard from "@/pages/HotelDashboard";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DebugInfo } from "@/components/DebugInfo";

function App() {
  console.log("App: Starting to render");

  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Multiple paths to Index component for accessibility */}
                  <Route path="/" element={<Index />} />
                  <Route path="/index" element={<Index />} />
                  <Route path="/INDEX" element={<Index />} />
                  <Route path="/home" element={<Index />} />
                  
                  {/* Public routes */}
                  <Route path="/press" element={<Press />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* User dashboard - protected for logged-in users */}
                  <Route
                    path="/user-dashboard"
                    element={
                      <ProtectedRoute>
                        <UserDashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Hotel dashboard - protected for hotel owners */}
                  <Route
                    path="/hotel-dashboard"
                    element={
                      <ProtectedRoute requireHotelOwner={true}>
                        <HotelDashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Admin dashboard - protected for admins only */}
                  <Route
                    path="/admin-dashboard"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Debug info in development */}
                <DebugInfo />
              </div>
            </ErrorBoundary>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
