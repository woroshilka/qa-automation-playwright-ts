import { test, expect } from "../../src/fixtures/test.fixture";

test.describe("Shopping Cart Tests", () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
  });

  test("user can add item to cart", async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    const count = await cartPage.getItemsCount();
    expect(count).toBe(1);
  });

  test("user can remove item from cart", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.goToCart();

    let count = await cartPage.getItemsCount();
    expect(count).toBe(2);

    await cartPage.removeItemByIndex(0);
    count = await cartPage.getItemsCount();
    expect(count).toBe(1);
  });

  test("user can continue shopping from cart", async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory/);
  });

  test("user can proceed to checkout from cart", async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();

    await cartPage.startCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test("cart displays multiple items correctly", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.addItemToCartByIndex(1);
    await inventoryPage.addItemToCartByIndex(2);
    await inventoryPage.goToCart();

    const count = await cartPage.getItemsCount();
    expect(count).toBe(3);
  });
});
