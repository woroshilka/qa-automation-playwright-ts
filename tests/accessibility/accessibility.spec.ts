import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Tests", () => {
  test(
    "login page has no critical accessibility violations",
    { tag: "@a11y" },
    async ({ page }) => {
      await page.goto("/");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const critical = results.violations.filter((v) => v.impact === "critical");
      expect(
        critical,
        `Critical violations: ${critical.map((v) => v.description).join(", ")}`,
      ).toHaveLength(0);
    },
  );

  test(
    "inventory page has no critical accessibility violations",
    { tag: "@a11y" },
    async ({ page }) => {
      await page.goto("/inventory.html");

      // Known SauceDemo bug: sort <select> has no <label> (select-name rule)
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .disableRules(["select-name"])
        .analyze();

      const critical = results.violations.filter((v) => v.impact === "critical");
      expect(
        critical,
        `Critical violations: ${critical.map((v) => v.description).join(", ")}`,
      ).toHaveLength(0);
    },
  );

  test(
    "login form is keyboard navigable",
    { tag: "@a11y" },
    async ({ page }) => {
      await page.goto("/");

      await page.keyboard.press("Tab");
      const usernameActive = await page.evaluate(
        () => document.activeElement?.id === "user-name",
      );
      expect(usernameActive).toBeTruthy();

      await page.keyboard.press("Tab");
      const passwordActive = await page.evaluate(
        () => document.activeElement?.id === "password",
      );
      expect(passwordActive).toBeTruthy();

      await page.keyboard.press("Tab");
      const loginBtnActive = await page.evaluate(
        () => document.activeElement?.id === "login-button",
      );
      expect(loginBtnActive).toBeTruthy();
    },
  );

  test(
    "error message is visible and has accessible text",
    { tag: "@a11y" },
    async ({ page }) => {
      await page.goto("/");
      await page.fill("#user-name", "invalid");
      await page.fill("#password", "invalid");
      await page.click("#login-button");

      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toBeVisible();

      const text = await errorMsg.textContent();
      expect(text).toBeTruthy();
      expect(text!.length).toBeGreaterThan(0);
    },
  );

  test(
    "cart page has no critical accessibility violations",
    { tag: "@a11y" },
    async ({ page }) => {
      await page.goto("/inventory.html");
      await page.locator(".btn_inventory").first().click();
      await page.locator(".shopping_cart_link").click();

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      const critical = results.violations.filter((v) => v.impact === "critical");
      expect(
        critical,
        `Critical violations: ${critical.map((v) => v.description).join(", ")}`,
      ).toHaveLength(0);
    },
  );
});
