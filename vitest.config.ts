import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest.setup.ts",
    reporters: ["default", "json"],
    css: true,
    outputFile: "test-results/vitest-output.json",
    exclude: ["**/node_modules/**", "**/tests/e2e/**"], // Exclude e2e tests
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
