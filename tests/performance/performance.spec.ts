import { test, expect } from "../../src/fixtures/test.fixture";
import { testUsers } from "../../src/utils/testData";

const STANDARD_LOGIN_BUDGET_MS = 3000;
const GLITCH_LOGIN_BUDGET_MS = 10000;

test.describe("Performance Tests", () => {
  test(
    "standard user logs in within 3s budget",
    { tag: "@regression" },
    async ({ loginPage, page }) => {
      await loginPage.open();

      const start = Date.now();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);
      await page.waitForURL(/inventory/);
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(STANDARD_LOGIN_BUDGET_MS);
    },
  );

  test(
    "performance_glitch_user can login successfully despite delays",
    { tag: "@regression" },
    async ({ loginPage, page }) => {
      await loginPage.open();
      await loginPage.login(testUsers.performance.username, testUsers.performance.password);

      await expect(page).toHaveURL(/inventory/, { timeout: GLITCH_LOGIN_BUDGET_MS });
    },
  );

  test(
    "performance_glitch_user login is slower than standard user",
    { tag: "@regression" },
    async ({ loginPage, page }) => {
      await loginPage.open();

      const standardStart = Date.now();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);
      await page.waitForURL(/inventory/);
      const standardElapsed = Date.now() - standardStart;

      await loginPage.open();

      const glitchStart = Date.now();
      await loginPage.login(testUsers.performance.username, testUsers.performance.password);
      await page.waitForURL(/inventory/, { timeout: GLITCH_LOGIN_BUDGET_MS });
      const glitchElapsed = Date.now() - glitchStart;

      expect(glitchElapsed).toBeGreaterThan(standardElapsed);
    },
  );

  test(
    "inventory page loads within 5s for standard user",
    { tag: "@regression" },
    async ({ inventoryPage, page }) => {
      const start = Date.now();
      await inventoryPage.open();
      await page.locator(".inventory_list").waitFor({ state: "visible" });
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(5000);
    },
  );
});
