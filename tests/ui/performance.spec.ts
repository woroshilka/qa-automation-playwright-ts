import { test, expect } from "../../src/fixtures/test.fixture";
import { testUsers } from "../../src/utils/testData";
import { INVENTORY_SELECTORS } from "../../src/ui/selectors";

const SLOW_THRESHOLD_MS = 10000;

test.describe("Performance Glitch User Tests", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(
      testUsers.performance.username,
      testUsers.performance.password,
    );
  });

  test("performance user can login despite slow response", async ({ page }) => {
    await expect(page).toHaveURL(/inventory/, { timeout: SLOW_THRESHOLD_MS });
  });

  test("performance user sees product list after delay", async ({ inventoryPage }) => {
    const count = await inventoryPage.getItemsCount();
    expect(count).toBeGreaterThan(0);
  });

  test("performance user can add item to cart", async ({ inventoryPage, page }) => {
    await inventoryPage.addFirstItemToCart();

    const cartBadge = page.locator(INVENTORY_SELECTORS.cartBadge);
    await expect(cartBadge).toContainText("1");
  });

  test("performance user can navigate to cart", async ({ inventoryPage, page }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
  });
});
