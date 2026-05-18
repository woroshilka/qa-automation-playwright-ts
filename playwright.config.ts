import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  globalSetup: require.resolve('./src/auth/global.setup.ts'),
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['allure-playwright', { outputFolder: 'allure-results' }]]
    : [['list'], ['html'], ['allure-playwright', { outputFolder: 'allure-results' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    storageState: 'storageState.json',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: ['**/api/**', '**/visual/**'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: ['**/api/**', '**/visual/**', '**/accessibility/**'],
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'visual',
      testMatch: '**/visual/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      snapshotDir: './tests/visual/__snapshots__',
    },
  ],
});
