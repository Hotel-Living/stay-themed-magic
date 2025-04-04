
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import HotelSignUp from "./pages/HotelSignUp";
import HotelLogin from "./pages/HotelLogin";
import HotelDashboard from "./pages/HotelDashboard";
import UserDashboard from "./pages/UserDashboard";
import FAQ from "./pages/FAQ";
import FAQHotels from "./pages/FAQHotels";
import FAQTravelers from "./pages/FAQTravelers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CustomerService from "./pages/CustomerService";
import OurValues from "./pages/OurValues";
import OurServices from "./pages/OurServices";
import IntellectualProperty from "./pages/IntellectualProperty";
import HotelPartnerAgreement from "./pages/HotelPartnerAgreement";
import NotFound from "./pages/NotFound";
import CodeStats from "./pages/CodeStats";
import AddPropertyPage from "./pages/AddPropertyPage";
import ThemeInformationPage from "./pages/ThemeInformationPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/hotel-signup" element={<HotelSignUp />} />
        <Route path="/hotel-login" element={<HotelLogin />} />
        <Route path="/hotel-dashboard/*" element={<HotelDashboard />} />
        <Route path="/dashboard/*" element={<UserDashboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/faq-hotels" element={<FAQHotels />} />
        <Route path="/faq-travelers" element={<FAQTravelers />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/our-values" element={<OurValues />} />
        <Route path="/our-services" element={<OurServices />} />
        <Route path="/intellectual-property" element={<IntellectualProperty />} />
        <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
        <Route path="/code-stats" element={<CodeStats />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/theme-information" element={<ThemeInformationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
