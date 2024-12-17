import { defineConfig } from "cypress";
import startDevServer from "cypress-vite";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // Use the startDevServer function from cypress-vite
      start: (options) => startDevServer({ options }),
    },
  },
});