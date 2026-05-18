import { BasePage } from "../base/BasePage";
import { LOGIN_SELECTORS } from "../../selectors";

export class LoginPage extends BasePage {
  async open() {
    await super.open(process.env.BASE_URL_PATH ?? "/");
  }

  async login(user: string, pass: string) {
    await this.page.fill(LOGIN_SELECTORS.username, user);
    await this.page.fill(LOGIN_SELECTORS.password, pass);
    await this.page.click(LOGIN_SELECTORS.loginBtn);
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      const isVisible = await this.page
        .locator(LOGIN_SELECTORS.errorMsg)
        .isVisible();
      if (isVisible) {
        return await this.page.locator(LOGIN_SELECTORS.errorMsg).textContent();
      }
      return null;
    } catch {
      return null;
    }
  }

  async isErrorDisplayed(): Promise<boolean> {
    try {
      return await this.page.locator(LOGIN_SELECTORS.errorMsg).isVisible();
    } catch {
      return false;
    }
  }
}
