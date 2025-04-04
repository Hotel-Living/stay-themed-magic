
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { supabase } from '@/integrations/supabase/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Enable realtime for reviews table
supabase.channel('public:reviews')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'reviews' 
  }, payload => {
    console.log('Reviews change received:', payload);
  })
  .subscribe();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
