import { BasePage } from "../base/BasePage";
import { CART_SELECTORS } from "../../selectors";

export class CartPage extends BasePage {
  async getItemsCount() {
    return await this.page.locator(CART_SELECTORS.items).count();
  }

  async startCheckout() {
    await this.page.click(CART_SELECTORS.checkoutBtn);
  }

  async removeItemByIndex(index: number) {
    const buttons = this.page.locator(CART_SELECTORS.itemRemoveBtn);
    if (index >= (await buttons.count())) {
      throw new Error(`Item index ${index} out of bounds`);
    }
    await buttons.nth(index).click();
  }

  async continueShopping() {
    await this.page.click(CART_SELECTORS.continueShoppingBtn);
  }
}
