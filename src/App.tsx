
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import HotelLogin from "@/pages/HotelLogin";
import SignUp from "@/pages/SignUp";
import HotelDetail from "@/pages/HotelDetail";
import Search from "@/pages/Search";
import HotelDashboard from "@/pages/HotelDashboard";
import UserDashboard from "@/pages/UserDashboard";
import NotFound from "@/pages/NotFound";
import Hotels from "@/pages/Hotels";
import HotelSignUp from "@/pages/HotelSignUp";
import FAQ from "@/pages/FAQ";
import FAQHotels from "@/pages/FAQHotels";
import FAQTravelers from "@/pages/FAQTravelers";
import OurValues from "@/pages/OurValues";
import OurServices from "@/pages/OurServices";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import IntellectualProperty from "@/pages/IntellectualProperty";
import CustomerService from "@/pages/CustomerService";
import ForgotPassword from "@/pages/ForgotPassword";
import CodeStats from "@/pages/CodeStats";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotel-login" element={<HotelLogin />} />
        <Route path="/hotel-signup" element={<HotelSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hotel-dashboard" element={<HotelDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/hoteles" element={<Hotels />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq-hotels" element={<FAQHotels />} />
        <Route path="/faq-travelers" element={<FAQTravelers />} />
        <Route path="/our-values" element={<OurValues />} />
        <Route path="/our-services" element={<OurServices />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/intellectual-property" element={<IntellectualProperty />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/code-stats" element={<CodeStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
