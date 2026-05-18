import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
  test("login page matches snapshot", { tag: "@visual" }, async ({ page }) => {
    await page.goto("/");
    await page.locator("#login-button").waitFor({ state: "visible" });

    await expect(page).toHaveScreenshot("login-page.png", {
      maxDiffPixelRatio: 0.05,
    });
  });

  test("inventory page matches snapshot", { tag: "@visual" }, async ({ page }) => {
    await page.goto("/inventory.html");
    await page.locator(".inventory_list").waitFor({ state: "visible" });

    await expect(page).toHaveScreenshot("inventory-page.png", {
      maxDiffPixelRatio: 0.05,
    });
  });

  test("cart page matches snapshot", { tag: "@visual" }, async ({ page }) => {
    await page.goto("/inventory.html");
    await page.locator(".btn_inventory").first().click();
    await page.locator(".shopping_cart_link").click();
    await page.locator(".cart_list").waitFor({ state: "visible" });

    await expect(page).toHaveScreenshot("cart-page.png", {
      maxDiffPixelRatio: 0.05,
    });
  });

  test("checkout complete page matches snapshot", { tag: "@visual" }, async ({ page }) => {
    await page.goto("/inventory.html");
    await page.locator(".btn_inventory").first().click();
    await page.locator(".shopping_cart_link").click();
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("John");
    await page.locator("#last-name").fill("Doe");
    await page.locator("#postal-code").fill("12345");
    await page.locator("#continue").click();
    await page.locator("#finish").click();
    await page.locator(".complete-header").waitFor({ state: "visible" });

    await expect(page).toHaveScreenshot("checkout-complete-page.png", {
      maxDiffPixelRatio: 0.05,
    });
  });
});
