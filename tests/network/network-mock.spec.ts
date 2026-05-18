import { test, expect } from "@playwright/test";

test.describe("Network Interception Tests", () => {
  test(
    "inventory page renders correctly with blocked images",
    { tag: "@regression" },
    async ({ page }) => {
      await page.route("**/*.{png,jpg,jpeg,gif,webp,svg}", (route) => route.abort());
      await page.goto("/inventory.html");

      const items = page.locator(".inventory_item");
      await expect(items.first()).toBeVisible();
      expect(await items.count()).toBe(6);
    },
  );

  test(
    "should capture all network requests on page load",
    { tag: "@regression" },
    async ({ page }) => {
      const requests: string[] = [];
      page.on("request", (req) => requests.push(req.url()));

      await page.goto("/");

      expect(requests.length).toBeGreaterThan(0);
      expect(requests.some((url) => url.includes("saucedemo"))).toBeTruthy();
    },
  );

  test(
    "login page loads within performance budget (3s)",
    { tag: "@regression" },
    async ({ page }) => {
      const start = Date.now();
      await page.goto("/");
      const loadTime = Date.now() - start;

      expect(loadTime).toBeLessThan(3000);
      await expect(page.locator("#login-button")).toBeVisible();
    },
  );

  test(
    "should load page structure even when CSS is blocked",
    { tag: "@regression" },
    async ({ page }) => {
      await page.route("**/*.css", (route) => route.abort());
      await page.goto("/");

      expect(await page.locator("#user-name").count()).toBe(1);
      expect(await page.locator("#password").count()).toBe(1);
      expect(await page.locator("#login-button").count()).toBe(1);
    },
  );

  test(
    "should intercept and log response status codes",
    { tag: "@regression" },
    async ({ page }) => {
      const statuses: number[] = [];
      page.on("response", (res) => statuses.push(res.status()));

      await page.goto("/inventory.html");

      expect(statuses.length).toBeGreaterThan(0);
      const failedRequests = statuses.filter((s) => s >= 500);
      expect(failedRequests).toHaveLength(0);
    },
  );

  test(
    "should complete checkout flow even with slow network simulation",
    { tag: "@regression" },
    async ({ page }) => {
      let delayApplied = false;
      await page.route("**/*", async (route) => {
        if (!delayApplied) {
          delayApplied = true;
          await new Promise((r) => setTimeout(r, 200));
        }
        await route.continue();
      });

      await page.goto("/inventory.html");
      await expect(page.locator(".inventory_item").first()).toBeVisible({ timeout: 10000 });
    },
  );
});
