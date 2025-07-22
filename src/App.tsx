
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AssociationDashboard from "./pages/AssociationDashboard";
import PromoterDashboard from "./pages/PromoterDashboard";
import PanelFernando from "./pages/PanelFernando";
import HotelDetail from "./pages/HotelDetail";
import HotelList from "./pages/HotelList";
import JoinUsPage from "./pages/JoinUsPage";
import HotelRegistration from "./pages/HotelRegistration";
import HotelRegistrationSuccess from "./pages/HotelRegistrationSuccess";
import AdminRestore from "./pages/AdminRestore";
import AdminUsersPanel from "./components/dashboard/admin/AdminUsersPanel";
import AdminUserDetailView from "./components/dashboard/admin/AdminUserDetailView";
import AuthConfirmation from "./components/auth/AuthConfirmation";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin-restore" element={<AdminRestore />} />
                <Route path="/hotels" element={<HotelList />} />
                <Route path="/hotels/:id" element={<HotelDetail />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/register-hotel" element={<HotelRegistration />} />
                <Route path="/hotel-registration-success" element={<HotelRegistrationSuccess />} />
                <Route path="/confirm" element={<AuthConfirmation />} />
                
                <Route
                  path="/user-dashboard"
                  element={
                    <ProtectedRoute requireTraveler={true}>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/hotel-dashboard"
                  element={
                    <ProtectedRoute requireHotelOwner={true}>
                      <HotelDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/panel-asociacion"
                  element={
                    <ProtectedRoute requireAssociation={true}>
                      <AssociationDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/promoter/dashboard"
                  element={
                    <ProtectedRoute requirePromoter={true}>
                      <PromoterDashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/admin/*"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <AdminUsersPanel />
                    </AdminRoute>
                  }
                />
                
                <Route
                  path="/admin/users/:id"
                  element={
                    <AdminRoute>
                      <AdminUserDetailView />
                    </AdminRoute>
                  }
                />
                
                <Route
                  path="/panel-fernando/*"
                  element={
                    <AdminRoute>
                      <PanelFernando />
                    </AdminRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
