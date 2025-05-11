
import { defineConfig, loadEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Define type for componentTagger to avoid TypeScript errors
type ComponentTaggerType = () => Plugin;

// Import componentTagger conditionally to prevent build errors
let componentTagger: ComponentTaggerType | null = null;
try {
  // Try to dynamically import the tagger only if needed
  if (process.env.NODE_ENV === 'development') {
    componentTagger = require("lovable-tagger").componentTagger;
  }
} catch (error) {
  console.warn("Lovable tagger not available, skipping component tagging");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Only use componentTagger in development and if available
      mode === 'development' && componentTagger ? componentTagger() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Define environment variables
    define: {
      'import.meta.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY)
    },
    // Add explicit build target configuration
    build: {
      target: 'es2015',
      outDir: 'dist',
    },
  };
});
