import { test, expect } from "../../src/fixtures/test.fixture";
import { testUsers } from "../../src/utils/testData";
import { LOGIN_SELECTORS } from "../../src/ui/selectors";

test.describe("Login UI Tests", () => {
  test("user can successfully login", async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(
      testUsers.standard.username,
      testUsers.standard.password,
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test("error displayed for locked user", async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(testUsers.locked.username, testUsers.locked.password);

    const errorDisplayed = await loginPage.isErrorDisplayed();
    expect(errorDisplayed).toBeTruthy();
  });

  test("error displayed for problem user", async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(
      testUsers.problem.username,
      testUsers.problem.password,
    );

    await expect(page).toHaveURL(/inventory/);
  });

  test("error message contains proper text", async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login("invalid_user", "invalid_pass");

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Epic sadface");
  });

  test("login form fields are all visible", async ({ loginPage, page }) => {
    await loginPage.open();

    await expect(page.locator(LOGIN_SELECTORS.username)).toBeVisible();
    await expect(page.locator(LOGIN_SELECTORS.password)).toBeVisible();
    await expect(page.locator(LOGIN_SELECTORS.loginBtn)).toBeVisible();
  });
});
