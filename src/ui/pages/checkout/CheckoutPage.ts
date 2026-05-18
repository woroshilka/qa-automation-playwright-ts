import { BasePage } from "../base/BasePage";
import { CHECKOUT_SELECTORS } from "../../selectors";

export class CheckoutPage extends BasePage {
  async fillCustomerInfo(first: string, last: string, zip: string) {
    await this.page.fill(CHECKOUT_SELECTORS.firstName, first);
    await this.page.fill(CHECKOUT_SELECTORS.lastName, last);
    await this.page.fill(CHECKOUT_SELECTORS.postalCode, zip);
  }

  async continue() {
    await this.page.click(CHECKOUT_SELECTORS.continueBtn);
  }

  async finish() {
    await this.page.waitForSelector(CHECKOUT_SELECTORS.finishBtn, {
      state: "visible",
      timeout: 10000,
    });
    await this.page.click(CHECKOUT_SELECTORS.finishBtn);
  }

  async getSuccessMessage(): Promise<string | null> {
    try {
      return await this.page.textContent(CHECKOUT_SELECTORS.successTitle);
    } catch {
      return null;
    }
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      const isVisible = await this.page
        .locator(CHECKOUT_SELECTORS.errorMsg)
        .isVisible();
      if (isVisible) {
        return await this.page
          .locator(CHECKOUT_SELECTORS.errorMsg)
          .textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  async hasError(): Promise<boolean> {
    try {
      return await this.page.locator(CHECKOUT_SELECTORS.errorMsg).isVisible();
    } catch {
      return false;
    }
  }
}
