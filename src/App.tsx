
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import HotelLogin from "@/pages/HotelLogin";
import HotelSignup from "@/pages/HotelSignup";
import HotelDashboard from "@/pages/HotelDashboard";
import UserDashboard from "@/pages/UserDashboard";
import Hotels from "@/pages/Hotels";
import HotelDetails from "@/pages/HotelDetails";
import BookingConfirmation from "@/pages/BookingConfirmation";
import HotelProfile from "@/pages/HotelProfile";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Support from "@/pages/Support";
import TermsConditions from "@/pages/TermsConditions";
import Privacy from "@/pages/Privacy";
import Copyright from "@/pages/Copyright";
import CustomerService from "@/pages/CustomerService";
import OurTeam from "@/pages/OurTeam";
import OurValues from "@/pages/OurValues";
import OurServices from "@/pages/OurServices";
import PasswordRecovery from "@/pages/PasswordRecovery";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import AdminDashboard from "@/pages/AdminDashboard";
import HotelCreation from "@/pages/HotelCreation";
import ComingSoon from "@/pages/ComingSoon";
import HotelsGrid from "@/pages/HotelsGrid";
import BlogGrid from "@/pages/BlogGrid";
import BlogPost from "@/pages/BlogPost";
import DestinationsList from "@/pages/DestinationsList";
import CountryDetail from "@/pages/CountryDetail";
import CityDetail from "@/pages/CityDetail";
import HotelCalc from "@/pages/HotelCalc";
import ServiceCalculations from "@/pages/ServiceCalculations";
import HowItWorks from "@/pages/HowItWorks";
import Ambassadors from "@/pages/Ambassadors";
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
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/hotel-login",
    element: <HotelLogin />
  },
  {
    path: "/hotel-signup",
    element: <HotelSignup />
  },
  {
    path: "/password-recovery",
    element: <PasswordRecovery />
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
    element: <HotelsGrid />
  },
  {
    path: "/hotel/:id",
    element: <HotelDetails />
  },
  {
    path: "/booking-confirmation",
    element: (
      <ProtectedRoute>
        <BookingConfirmation />
      </ProtectedRoute>
    )
  },
  {
    path: "/hotel-profile",
    element: (
      <ProtectedRoute requireHotelOwner={true}>
        <HotelProfile />
      </ProtectedRoute>
    )
  },
  {
    path: "/hotel-creation",
    element: (
      <ProtectedRoute requireHotelOwner={true}>
        <HotelCreation />
      </ProtectedRoute>
    )
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/support",
    element: <Support />
  },
  {
    path: "/terms",
    element: <TermsConditions />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/copyright",
    element: <Copyright />
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
    path: "/coming-soon",
    element: <ComingSoon />
  },
  {
    path: "/blog",
    element: <BlogGrid />
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />
  },
  {
    path: "/destinations",
    element: <DestinationsList />
  },
  {
    path: "/country/:country",
    element: <CountryDetail />
  },
  {
    path: "/city/:country/:city",
    element: <CityDetail />
  },
  {
    path: "/hotel-calc",
    element: <HotelCalc />
  },
  {
    path: "/calculadoras",
    element: <ServiceCalculations />
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />
  },
  {
    path: "/ambassadors",
    element: <Ambassadors />
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
