import { test, expect } from "../../src/fixtures/test.fixture";
import { testUsers } from "../../src/utils/testData";
import { LOGIN_SELECTORS } from "../../src/ui/selectors";

test.describe("Login Smoke Tests", () => {
  test("app is reachable and login page loads", async ({ loginPage, page }) => {
    await loginPage.open();

    await expect(page.locator(LOGIN_SELECTORS.loginBtn)).toBeVisible();
  });

  test("user can login with valid credentials", async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(
      testUsers.standard.username,
      testUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory/);
  });
});
