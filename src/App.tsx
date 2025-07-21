
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AssociationLanding from "./pages/AssociationLanding";
import AssociationRegistration from "./pages/AssociationRegistration";
import { AssociationDashboard } from "@/components/association/AssociationDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/asociacion" element={<AssociationLanding />} />
              <Route path="/asociacion/registro" element={<AssociationRegistration />} />
              
              <Route 
                path="/user-dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/hotel-dashboard" 
                element={
                  <ProtectedRoute requireHotelOwner>
                    <HotelDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/association/dashboard" 
                element={
                  <ProtectedRoute requireAssociation>
                    <AssociationDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/panel-asociacion" 
                element={
                  <ProtectedRoute requireAssociation>
                    <AssociationDashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/admin" 
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } 
              />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
