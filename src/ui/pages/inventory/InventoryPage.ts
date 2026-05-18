import { BasePage } from "../base/BasePage";
import { INVENTORY_SELECTORS } from "../../selectors";

export class InventoryPage extends BasePage {
  async open() {
    await super.open("/inventory.html");
  }

  async getItemsCount() {
    return await this.page.locator(INVENTORY_SELECTORS.items).count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator(INVENTORY_SELECTORS.itemName).allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.page.locator(INVENTORY_SELECTORS.itemPrice).allTextContents();
    return texts.map((p) => parseFloat(p.replace("$", "")));
  }

  async addFirstItemToCart() {
    await this.page.locator(INVENTORY_SELECTORS.addToCartBtn).first().click();
  }

  async addItemToCartByIndex(index: number) {
    const items = this.page.locator(INVENTORY_SELECTORS.addToCartBtn);
    if (index >= (await items.count())) {
      throw new Error(`Item index ${index} out of bounds`);
    }
    await items.nth(index).click();
  }

  async navigateToFirstProduct() {
    await this.page.locator(INVENTORY_SELECTORS.itemName).first().click();
  }

  async goToCart() {
    await this.page.locator(INVENTORY_SELECTORS.cartLink).click();
  }

  async sortBy(value: string) {
    await this.page
      .locator(INVENTORY_SELECTORS.sortContainer)
      .selectOption(value);
  }
}
