import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// NO importamos visualizer directamente aquí para evitar errores ESM

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isCI = process.env.CI === 'true';
  const buildTime = new Date().toISOString();
  const cacheBuster = Date.now().toString();

  const plugins = [
    react(),
    mode === 'development' && componentTagger(),
  ];

  if (!isCI) {
    const { visualizer } = await import("rollup-plugin-visualizer");
    plugins.push(visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }) as any);
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
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString())
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: mode === 'production' ? false : true,
      rollupOptions: {
        output: {
          // Generate unique filenames with hash for cache busting
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            supabase: ['@supabase/supabase-js'],
            router: ['react-router-dom'],
          },
        },
        plugins: [{
          name: 'replace-build-time',
          generateBundle(options: any, bundle: any) {
            // Replace build time and cache buster in HTML files
            Object.keys(bundle).forEach(fileName => {
              const file = bundle[fileName];
              if (file.type === 'asset' && fileName.endsWith('.html') && typeof file.source === 'string') {
                file.source = file.source
                  .replace(/__BUILD_TIME__/g, buildTime)
                  .replace(/__CACHE_BUSTER__/g, cacheBuster);
              }
            });
          }
        }]
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      globals: true,
    },
  };
});
