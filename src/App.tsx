
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { ComparisonProvider } from "@/components/comparison/ComparisonContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { Starfield } from "@/components/Starfield";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Suspense } from "react";
import { LoadingFallback } from "@/components/LoadingFallback";
import { OfflineBanner } from "@/components/OfflineBanner";
import AppRoutes from "./AppRoutes";

// Create a client with better caching strategy and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="hotel-living-theme">
          <Router>
            <AuthProvider>
              <AccessibilityProvider>
                <LanguageProvider>
                  <CurrencyProvider>
                    <ComparisonProvider>
                      {/* Global Starfield background that appears on all pages */}
                      <Starfield />
                      
                      {/* Offline status banner */}
                      <OfflineBanner />
                      
                      {/* All routes are defined in AppRoutes component */}
                      <Suspense fallback={<LoadingFallback />}>
                        <AppRoutes />
                      </Suspense>
                      
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
    </ErrorBoundary>
  );
}

export default App;
