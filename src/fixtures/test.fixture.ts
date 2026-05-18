import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../ui/pages/auth/LoginPage';
import { InventoryPage } from '../ui/pages/inventory/InventoryPage';
import { CartPage } from '../ui/pages/cart/CartPage';
import { CheckoutPage } from '../ui/pages/checkout/CheckoutPage';
import { ProductPage } from '../ui/pages/product/ProductPage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});

export { expect };
