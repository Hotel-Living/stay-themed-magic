import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isCI = process.env.CI === 'true';

  const plugins = [
    react(),
    mode === 'development' && componentTagger()
  ];

  // Temporarily disable visualizer to fix build issues
  // if (!isCI && mode === 'production') {
  //   const { visualizer } = await import("rollup-plugin-visualizer");
  //   plugins.push(visualizer({
  //     filename: 'dist/stats.html',
  //     open: false,
  //     gzipSize: true,
  //     brotliSize: true,
  //     template: 'treemap',
  //   }));
  // }

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: [
        "ca48e511-da23-4c95-9913-59cb1724cacc.lovableproject.com"
      ]
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY)
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            supabase: ['@supabase/supabase-js'],
            router: ['react-router-dom'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
    },
  };
});
