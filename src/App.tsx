
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import HotelSignUp from "@/pages/HotelSignUp";
import HotelDashboard from "@/pages/HotelDashboard";
import UserDashboard from "@/pages/UserDashboard";
import Hotels from "@/pages/Hotels";
import HotelDetail from "@/pages/HotelDetail";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Help from "@/pages/Help";
import Privacy from "@/pages/Privacy";
import IntellectualProperty from "@/pages/IntellectualProperty";
import CustomerService from "@/pages/CustomerService";
import OurTeam from "@/pages/OurTeam";
import OurValues from "@/pages/OurValues";
import OurServices from "@/pages/OurServices";
import ForgotPassword from "@/pages/ForgotPassword";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import HotelsPage from "@/pages/HotelsPage";
import Ambassador from "@/pages/Ambassador";
import FAQ from "@/pages/FAQ";
import PromoterDashboard from "@/pages/PromoterDashboard";
import AgentDashboard from "@/pages/AgentDashboard";
import AssociationLanding from "@/pages/AssociationLanding";
import AssociationRegistration from "@/pages/AssociationRegistration";
import { AssociationDashboard } from "@/components/association/AssociationDashboard";
import AmbassadorsList from "@/pages/AmbassadorsList";
import AmbassadorsUSA from "@/pages/AmbassadorsUSA";
import Press from "@/pages/Press";
import "./styles/index.css";
import "./i18n/config";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signin",
    element: <Login />
  },
  {
    path: "/hotel-signup",
    element: <HotelSignUp />
  },
  {
    path: "/password-recovery",
    element: <ForgotPassword />
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/hotel-dashboard",
    element: (
      <ProtectedRoute requireHotelOwner={true}>
        <HotelDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/hoteles",
    element: (
      <ProtectedRoute requireHotelOwner={true}>
        <Hotels />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    )
  },
  {
    path: "/hotels",
    element: <HotelsPage />
  },
  {
    path: "/hotel/:id",
    element: <HotelDetail />
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/support",
    element: <Help />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/copyright",
    element: <IntellectualProperty />
  },
  {
    path: "/customer-service",
    element: <CustomerService />
  },
  {
    path: "/our-team",
    element: <OurTeam />
  },
  {
    path: "/our-values",
    element: <OurValues />
  },
  {
    path: "/our-services",
    element: <OurServices />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/promoter/dashboard",
    element: (
      <ProtectedRoute>
        <PromoterDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/panel-agente",
    element: <AgentDashboard />
  },
  {
    path: "/asociacion",
    element: <AssociationLanding />
  },
  {
    path: "/asociacion/registro",
    element: <AssociationRegistration />
  },
  {
    path: "/panel-asociacion",
    element: (
      <ProtectedRoute requireAssociation={true}>
        <AssociationDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/ambassadors",
    element: <AmbassadorsList />
  },
  {
    path: "/ambassadors/usa",
    element: <AmbassadorsUSA />
  },
  {
    path: "/press",
    element: <Press />
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
