import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'production';
  const timestamp = Date.now();
  
  // Use unique output directory to avoid CI conflicts
  const outputDir = isCI ? `vite-build-${timestamp}` : 'dist';

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_MAPS_API_KEY || '')
    },
    build: {
      target: 'es2015',
      outDir: outputDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: 'assets/[name]-[hash].[ext]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  };
});
