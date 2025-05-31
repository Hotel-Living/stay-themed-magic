
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ui/theme-provider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDetail from "./pages/HotelDetail";
import Hotels from "./pages/Hotels";
import HotelSignUp from "./pages/HotelSignUp";
import FaqPage from "./pages/FAQ";
import ContactPage from "./pages/Contact";
import JoinUsPage from "./pages/JoinUs";
import JoinUsTestPage from "./pages/JoinUsTest";
import AffinityStaysPage from "./pages/AffinityStays";
import AffinityExplorer from "./pages/AffinityExplorer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AdminRoute } from "./components/auth/AdminRoute";
import CodeStats from "./pages/CodeStats";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <AuthProvider>
            <ScrollToTop />
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotel-signup" element={<HotelSignUp />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/join-us-test" element={<JoinUsTestPage />} />
                <Route path="/affinity-stays" element={<AffinityStaysPage />} />
                <Route path="/affinity-explorer" element={<AffinityExplorer />} />
                <Route path="/code-stats" element={<CodeStats />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
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
                    <ProtectedRoute>
                      <HotelDashboard />
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
              </Routes>
            </div>
            <Toaster />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
