import { Page } from "@playwright/test";
import Logger from "../../../utils/logger";

export class BasePage {
  constructor(protected page: Page) {}

  async open(path: string) {
    Logger.info(`Navigating to: ${path}`);
    await this.page.goto(path, { waitUntil: "load" });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForElement(
    selector: string,
    timeout: number = 30000,
  ): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout });
      return true;
    } catch {
      return false;
    }
  }
}
