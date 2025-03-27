
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { ComparisonProvider } from "@/components/comparison/ComparisonContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
// Removed Starfield import
import AppRoutes from "./AppRoutes";

// Create a client with better caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="hotel-living-theme">
        <Router>
          <AuthProvider>
            <AccessibilityProvider>
              <LanguageProvider>
                <CurrencyProvider>
                  <ComparisonProvider>
                    {/* Removed Starfield component */}
                    
                    {/* All routes are now defined in AppRoutes component */}
                    <AppRoutes />
                    
                    {/* Toast notifications */}
                    <Toaster />
                  </ComparisonProvider>
                </CurrencyProvider>
              </LanguageProvider>
            </AccessibilityProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
