// Import the `defineConfig` function from Vite for configuring the build tool
import { defineConfig } from 'vite';

// Import the React plugin for Vite to enable support for React features
import react from '@vitejs/plugin-react';

// Export the Vite configuration
export default defineConfig({
  // Define plugins to be used by Vite
  plugins: [
    react(), // Enables React fast refresh and other React-specific features
  ],
});