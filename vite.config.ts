
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
    mode === 'development' && componentTagger(),
  ];

  // Only add visualizer in non-CI environments to avoid build issues
  if (!isCI && mode === 'development') {
    try {
      const { visualizer } = await import("rollup-plugin-visualizer");
      plugins.push(visualizer({
        filename: 'dist/stats.html',
        open: false, // Don't auto-open in CI/production
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }) as any);
    } catch (error) {
      console.warn('Visualizer plugin not available:', error instanceof Error ? error.message : String(error));
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      allowedHosts: ["all"]
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Note: VITE_GOOGLE_MAPS_API_KEY should be managed via Supabase secrets
    // and retrieved through edge functions, not embedded in the build
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
