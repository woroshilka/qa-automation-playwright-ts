import { test, expect } from "../../src/fixtures/test.fixture";

test.describe("Product Detail Page Tests", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.navigateToFirstProduct();
  });

  test("should display product name", { tag: "@regression" }, async ({ productPage }) => {
    const name = await productPage.getProductName();
    expect(name).toBeTruthy();
    expect(name.length).toBeGreaterThan(0);
  });

  test("should display product description", { tag: "@regression" }, async ({ productPage }) => {
    const description = await productPage.getProductDescription();
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(0);
  });

  test("should display product price in correct format", { tag: "@regression" }, async ({ productPage }) => {
    const price = await productPage.getProductPrice();
    expect(price).toMatch(/^\$\d+\.\d{2}$/);
  });

  test("should add product to cart from detail page", { tag: "@regression" }, async ({ productPage, page }) => {
    await productPage.addToCart();

    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toContainText("1");
  });

  test("should navigate back to products list", { tag: "@regression" }, async ({ productPage, page }) => {
    await productPage.backToProducts();

    await expect(page).toHaveURL(/inventory/);
  });

  test("should show same product after back navigation", { tag: "@regression" }, async ({
    inventoryPage,
    productPage,
  }) => {
    const productName = await productPage.getProductName();
    await productPage.backToProducts();

    const allNames = await inventoryPage.getItemNames();
    expect(allNames).toContain(productName);
  });
});
