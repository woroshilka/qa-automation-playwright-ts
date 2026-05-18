import { chromium, FullConfig } from '@playwright/test';
import { ENV } from '../utils/env';
import { LOGIN_SELECTORS } from '../ui/selectors';

async function globalSetup(_config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(ENV.BASE_URL + ENV.BASE_URL_PATH);

  await page.fill(LOGIN_SELECTORS.username, ENV.TEST_USERNAME);
  await page.fill(LOGIN_SELECTORS.password, ENV.TEST_PASSWORD);
  await page.click(LOGIN_SELECTORS.loginBtn);

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
