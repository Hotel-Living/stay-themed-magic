// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@supabase/supabase-js',
        'sonner',
        'xlsx',
        'date-fns',
        '@radix-ui/react-separator',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-switch',
        '@radix-ui/react-select',
        '@radix-ui/react-popover',
        'react-day-picker',
        'embla-carousel-react',
        'country-state-city'
      ]
    }
  }
})
