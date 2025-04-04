
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { supabase } from '@/integrations/supabase/client';

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

createRoot(document.getElementById("root")!).render(<App />);
