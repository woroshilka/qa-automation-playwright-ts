import { BasePage } from "../base/BasePage";
import { PRODUCT_SELECTORS } from "../../selectors";

export class ProductPage extends BasePage {
  async getProductName(): Promise<string> {
    return (await this.page.locator(PRODUCT_SELECTORS.name).textContent()) ?? "";
  }

  async getProductDescription(): Promise<string> {
    return (await this.page.locator(PRODUCT_SELECTORS.description).textContent()) ?? "";
  }

  async getProductPrice(): Promise<string> {
    return (await this.page.locator(PRODUCT_SELECTORS.price).textContent()) ?? "";
  }

  async addToCart() {
    await this.page.locator(PRODUCT_SELECTORS.addToCartBtn).click();
  }

  async backToProducts() {
    await this.page.locator(PRODUCT_SELECTORS.backBtn).click();
  }
}
