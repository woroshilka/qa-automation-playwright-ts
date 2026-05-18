// Login Page Selectors
export const LOGIN_SELECTORS = {
  username: "#user-name",
  password: "#password",
  loginBtn: "#login-button",
  errorMsg: '[data-test="error"]',
};

// Inventory Page Selectors
export const INVENTORY_SELECTORS = {
  items: ".inventory_item",
  itemName: ".inventory_item_name",
  itemPrice: ".inventory_item_price",
  addToCartBtn: ".btn_inventory",
  cartLink: ".shopping_cart_link",
  sortContainer: ".product_sort_container",
  cartBadge: ".shopping_cart_badge",
};

// Product Detail Page Selectors
export const PRODUCT_SELECTORS = {
  name: ".inventory_details_name",
  description: ".inventory_details_desc",
  price: ".inventory_details_price",
  addToCartBtn: ".btn_inventory",
  backBtn: "[data-test='back-to-products']",
};

// Cart Page Selectors
export const CART_SELECTORS = {
  items: ".cart_item",
  checkoutBtn: "#checkout",
  continueShoppingBtn: "#continue-shopping",
  itemRemoveBtn: ".cart_button",
};

// Checkout Page Selectors
export const CHECKOUT_SELECTORS = {
  firstName: "#first-name",
  lastName: "#last-name",
  postalCode: "#postal-code",
  continueBtn: "#continue",
  finishBtn: "#finish",
  successTitle: ".complete-header",
  errorMsg: '[data-test="error"]',
};

// Common Selectors
export const COMMON_SELECTORS = {
  pageTitle: "h1",
  errorContainer: ".error-container",
};
