import { defineConfig } from 'cypress';
import viteConfig from '../vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    // Specify where to find your component test files
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}', // Adjust this pattern as needed
  },

  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    // Specify where to find your end-to-end test files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Adjust this pattern as needed
  },
});