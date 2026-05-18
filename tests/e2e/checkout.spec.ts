import { test, expect } from "../../src/fixtures/test.fixture";
import { testUsers, checkoutData, invalidCheckoutData } from "../../src/utils/testData";

test.describe("E2E Checkout Flow", () => {
  test(
    "should complete full checkout flow",
    { tag: "@regression" },
    async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
      await loginPage.open();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);

      await inventoryPage.addFirstItemToCart();
      await inventoryPage.goToCart();
      await cartPage.startCheckout();
      await checkoutPage.fillCustomerInfo(checkoutData.firstName, checkoutData.lastName, checkoutData.zipCode);
      await checkoutPage.continue();
      await checkoutPage.finish();

      await expect(page).toHaveURL(/checkout-complete/);
    },
  );

  test(
    "should display success message after checkout",
    { tag: "@regression" },
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
      await loginPage.open();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);

      await inventoryPage.addFirstItemToCart();
      await inventoryPage.goToCart();
      await cartPage.startCheckout();
      await checkoutPage.fillCustomerInfo(checkoutData.firstName, checkoutData.lastName, checkoutData.zipCode);
      await checkoutPage.continue();
      await checkoutPage.finish();

      const successMsg = await checkoutPage.getSuccessMessage();
      expect(successMsg).toBeTruthy();
    },
  );

  test(
    "should add multiple items before checkout",
    { tag: "@regression" },
    async ({ loginPage, inventoryPage, cartPage, checkoutPage, page }) => {
      await loginPage.open();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);

      await inventoryPage.addFirstItemToCart();
      await inventoryPage.addItemToCartByIndex(1);
      await inventoryPage.goToCart();

      expect(await cartPage.getItemsCount()).toBe(2);

      await cartPage.startCheckout();
      await checkoutPage.fillCustomerInfo(checkoutData.firstName, checkoutData.lastName, checkoutData.zipCode);
      await checkoutPage.continue();
      await checkoutPage.finish();

      await expect(page).toHaveURL(/checkout-complete/);
    },
  );

  test(
    "should show error for all empty fields",
    { tag: "@regression" },
    async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
      await loginPage.open();
      await loginPage.login(testUsers.standard.username, testUsers.standard.password);

      await inventoryPage.addFirstItemToCart();
      await inventoryPage.goToCart();
      await cartPage.startCheckout();
      await checkoutPage.fillCustomerInfo(
        invalidCheckoutData.firstName,
        invalidCheckoutData.lastName,
        invalidCheckoutData.zipCode,
      );
      await checkoutPage.continue();

      expect(await checkoutPage.hasError()).toBeTruthy();
    },
  );
});

test.describe("Checkout Form Validation", () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.open();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await cartPage.startCheckout();
  });

  test("should show error when first name is missing", { tag: "@regression" }, async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("", "Doe", "12345");
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain("First Name");
  });

  test("should show error when last name is missing", { tag: "@regression" }, async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("John", "", "12345");
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain("Last Name");
  });

  test("should show error when postal code is missing", { tag: "@regression" }, async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("John", "Doe", "");
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain("Postal Code");
  });

  test("should allow form correction after validation error", { tag: "@regression" }, async ({ checkoutPage, page }) => {
    await checkoutPage.continue();
    expect(await checkoutPage.hasError()).toBeTruthy();

    await checkoutPage.fillCustomerInfo("John", "Doe", "12345");
    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-two/);
  });
});
