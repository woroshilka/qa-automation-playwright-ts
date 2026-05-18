import { test, expect } from "../../src/fixtures/test.fixture";
import { INVENTORY_SELECTORS } from "../../src/ui/selectors";

test.describe("Inventory Page Tests", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test("should display product list", { tag: "@regression" }, async ({ inventoryPage }) => {
    const count = await inventoryPage.getItemsCount();
    expect(count).toBeGreaterThan(0);
  });

  test("should add item to cart", { tag: "@regression" }, async ({ inventoryPage, page }) => {
    await inventoryPage.addFirstItemToCart();

    const cartBadge = page.locator(INVENTORY_SELECTORS.cartBadge);
    await expect(cartBadge).toContainText("1");
  });

  test("should navigate to cart", { tag: "@regression" }, async ({ inventoryPage, page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
  });

  test("should add multiple items to cart", { tag: "@regression" }, async ({ inventoryPage, page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);

    const cartBadge = page.locator(INVENTORY_SELECTORS.cartBadge);
    await expect(cartBadge).toContainText("3");
  });
});

// Data-driven sorting tests — covers all 4 sort options with one pattern
const nameSortOptions = [
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
];

const priceSortOptions = [
  { value: "lohi", label: "Price: Low to High" },
  { value: "hilo", label: "Price: High to Low" },
];

test.describe("Inventory Sorting", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  for (const { value, label } of nameSortOptions) {
    test(`should sort by name: ${label}`, { tag: "@regression" }, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(value);
      const names = await inventoryPage.getItemNames();
      const expected =
        value === "az"
          ? [...names].sort((a, b) => a.localeCompare(b))
          : [...names].sort((a, b) => b.localeCompare(a));
      expect(names).toEqual(expected);
    });
  }

  for (const { value, label } of priceSortOptions) {
    test(`should sort by ${label}`, { tag: "@regression" }, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(value);
      const prices = await inventoryPage.getItemPrices();
      const expected =
        value === "lohi"
          ? [...prices].sort((a, b) => a - b)
          : [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(expected);
    });
  }
});
