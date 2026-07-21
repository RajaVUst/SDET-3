import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';
import { Config } from "./config/Config";
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: "./tests",

  timeout: 30_000,

  fullyParallel: true,

  workers: process.env.CI ? 1 : 1,

  retries: process.env.CI ? 1 : 0,

  reporter: process.env.CI ? [["list"], ["blob"]] : [["list"], ["html"]],

  use: {
    baseURL: Config.baseUrl || "https://chess-agent-83252463.figma.site",
    headless: process.env.CI ? true : false,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    actionTimeout: 10_000,

    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
