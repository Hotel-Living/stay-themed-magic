
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { supabase } from '@/integrations/supabase/client';

// Enable enhanced realtime for reviews table
supabase.channel('public:reviews')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'reviews' 
  }, payload => {
    console.log('Reviews change received:', payload);
  })
  .subscribe();

// Add structured logging for better debugging
console.log('Application starting with latest Lovable version...', {
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
  version: import.meta.env.VITE_APP_VERSION || 'development'
});

// Create root with null check to ensure element exists
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
