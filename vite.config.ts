import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'axios',
        'clsx',
        'class-variance-authority',
        'react-dropzone',
        'zod',
        'tailwind-merge',
        'react-hook-form',
        '@tanstack/react-query',
        '@supabase/supabase-js',
        'react-day-picker',
        'country-state-city',
        'embla-carousel-react',
        'xlsx',
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-menubar',
        '@radix-ui/react-slot',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-toggle',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-separator',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-switch',
        '@radix-ui/react-select',
        '@radix-ui/react-popover'
      ]
    }
  }
})
