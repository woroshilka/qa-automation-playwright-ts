# 🧪 QA Automation Framework - Claude Documentation

**Enterprise-level Playwright + TypeScript testing framework for SauceDemo**

---

## 📌 Project Overview

This is a professional QA automation portfolio project featuring:

- **Page Object Model (POM)** architecture
- **Full API layer** with CRUD operations
- **22+ automated tests** across multiple categories
- **Clean code structure** with TypeScript strict mode
- **Centralized configuration** and selectors management

**Test Results:** ✅ 46 passed, ⏭️ 12 skipped

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd qa-automation-playwright-ts

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Running Tests

```bash
# Run all tests
npm test

# Run with UI mode
npm run test:ui

# Run with visible browser
npm run test:headed

# Run specific test categories
npm run test:ui        # UI tests only
npm run test:api       # API tests only
npm run test:smoke     # Smoke tests only
npm run test:e2e       # E2E tests only

# View HTML report
npm run report
```

---

## 📁 Project Structure

```
src/
├── api/                          # API testing layer
│   ├── clients/
│   │   └── apiClient.ts         # HTTP client wrapper (GET, POST, PUT, DELETE, PATCH)
│   ├── services/
│   │   ├── users.service.ts     # User CRUD operations
│   │   └── auth.service.ts      # Authentication endpoints
│   └── endpoints.ts             # Centralized API endpoints
│
├── ui/                           # UI testing layer
│   ├── pages/
│   │   ├── base/BasePage.ts     # Base class for all pages
│   │   ├── auth/LoginPage.ts    # Login page interactions
│   │   ├── inventory/
│   │   │   └── InventoryPage.ts # Product inventory page
│   │   ├── cart/CartPage.ts     # Shopping cart page
│   │   └── CheckoutPage.ts      # Checkout flow page
│   └── selectors.ts             # Centralized CSS selectors
│
├── utils/                        # Utilities
│   ├── env.ts                   # Configuration management
│   ├── logger.ts                # Structured logging (4 levels)
│   └── testData.ts              # Test fixtures & data
│
├── fixtures/
│   └── test.fixture.ts          # Custom Playwright fixtures
│
└── auth/
    └── global.setup.ts          # Global authentication setup

tests/
├── ui/
│   ├── login.spec.ts            # Login page tests (5 tests)
│   ├── inventory.spec.ts        # Inventory tests (5 tests)
│   └── cart.spec.ts             # Cart tests (5 tests)
├── e2e/
│   └── checkout.spec.ts         # End-to-end checkout (4 tests)
├── smoke/
│   └── login.smoke.spec.ts      # Smoke tests (4 tests)
└── api/
    └── users.spec.ts            # API tests (6 tests)
```

---

## 🏗️ Architecture

### Page Object Model (POM)

All pages inherit from `BasePage` which provides:

- `open(path)` - Navigate to page
- `getCurrentUrl()` - Get current URL
- `getPageTitle()` - Get page title
- `waitForElement(selector)` - Wait for element

### API Layer

```typescript
// ApiClient - HTTP wrapper
const client = new ApiClient(request, baseURL);
const users = await client.get("/api/users");

// UsersService - Business logic
const service = new UsersService(apiClient);
const user = await service.getUserById(1);

// AuthService - Auth operations
const auth = new AuthService(apiClient);
const token = await auth.login({ username, password });
```

### Test Fixtures

```typescript
// Custom fixtures for page objects
const { loginPage, inventoryPage, cartPage, checkoutPage } = useFixtures();
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file from `.env.example`:

```env
# Base URLs
BASE_URL=https://www.saucedemo.com
BASE_URL_PATH=/
API_URL=https://api.example.com

# Test credentials
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce

# Timeouts (ms)
TIMEOUT=30000
NAVIGATION_TIMEOUT=30000

# Logging
DEBUG=false
LOG_LEVEL=info  # error, warn, info, debug

# CI/CD
CI=false
```

### Playwright Config

Located in `playwright.config.ts`:

- ✅ Multiple browser support (Chromium, Firefox)
- ✅ HTML reporter enabled
- ✅ Storage state for session persistence
- ✅ Retry on CI (2 retries)
- ✅ Trace collection on first retry

---

## 🧪 Test Categories

### 1. Login Smoke Tests (4 tests)

- Valid login with correct credentials
- Locked user cannot login
- Invalid credentials show error
- Login page accessibility

**Run:** `npm run test:smoke`

### 2. UI Tests - Inventory (5 tests)

- Product list displays correctly
- Add item to cart
- Navigate to cart
- Add multiple items
- Product sorting

**Run:** `npm run test:ui:only`

### 3. UI Tests - Cart (5 tests)

- Add item to cart
- Remove item from cart
- Continue shopping
- Proceed to checkout
- Multiple items display

**Run:** `npm run test:ui:only`

### 4. UI Tests - Login (5 tests)

- Successful login
- Locked user error
- Problem user handling
- Error message validation
- Page accessibility

**Run:** `npm run test:ui:only`

### 5. E2E Tests - Checkout (4 tests)

- Complete checkout flow
- Success message display
- Multiple items checkout
- Error handling on empty form

**Run:** `npm run test:e2e`

### 6. API Tests - Users (6 tests)

- Get all users
- Get user by ID
- Return 404 for non-existent user
- Create new user
- Update existing user
- Delete user

**Run:** `npm run test:api`

---

## 📊 Logger Usage

```typescript
import Logger from "../../utils/logger";

Logger.error("Error message"); // Level 0
Logger.warn("Warning message"); // Level 1
Logger.info("Info message"); // Level 2
Logger.debug("Debug message"); // Level 3
```

Control log level via `LOG_LEVEL` env var: `info`, `warn`, `error`, `debug`

---

## 🔐 Authentication

Global setup in `src/auth/global.setup.ts`:

- Runs before all tests
- Handles initial authentication
- Stores session in `storageState.json`
- Tests reuse session for performance

---

## 🛠️ Development Guide

### Adding a New Page Object

1. Create file in `src/ui/pages/your-page/YourPage.ts`
2. Extend `BasePage`
3. Add selectors to `src/ui/selectors.ts`
4. Implement page methods

```typescript
import { BasePage } from "../base/BasePage";
import { YOUR_SELECTORS } from "../../selectors";

export class YourPage extends BasePage {
  async yourMethod() {
    await this.page.click(YOUR_SELECTORS.button);
  }
}
```

### Adding a New Test

1. Create file in `tests/category/your.spec.ts`
2. Use fixtures for page objects
3. Follow AAA pattern (Arrange, Act, Assert)

```typescript
import { test, expect } from "../../src/fixtures/test.fixture";

test.describe("Your Feature", () => {
  test("should do something", async ({ page, yourPage }) => {
    // Arrange
    await yourPage.open();

    // Act
    await yourPage.yourMethod();

    // Assert
    await expect(page).toHaveURL(/expected/);
  });
});
```

### Adding API Tests

```typescript
import { UsersService } from "../../src/api/services/users.service";

test("should get user", async ({ request }) => {
  const apiClient = new ApiClient(request, ENV.API_URL);
  const service = new UsersService(apiClient);
  const user = await service.getUserById(1);
  expect(user).toBeDefined();
});
```

---

## 🚨 Troubleshooting

### Tests timeout

- Increase `TIMEOUT` in `.env`
- Check network connectivity
- Verify page elements load correctly

### Selectors not found

- Check selector in `src/ui/selectors.ts`
- Use `npm run test:headed` to debug visually
- Verify page structure hasn't changed

### API tests skip

- API endpoint not available (expected in this setup)
- Tests skip gracefully with try/catch
- For real API, update `env.API_URL`

### Session issues

- Delete `storageState.json`
- Run tests again to regenerate session
- Check authentication flow

---

## 📈 Test Coverage

| Category     | Tests  | Status               |
| ------------ | ------ | -------------------- |
| Login        | 9      | ✅ Passing           |
| Inventory    | 5      | ✅ Passing           |
| Cart         | 5      | ✅ Passing           |
| Checkout E2E | 4      | ✅ Passing           |
| API (Users)  | 6      | ⏭️ Skipped\*         |
| **Total**    | **29** | **46+ with retries** |

\*API tests skipped due to endpoint not available in test environment

---

## 🔄 CI/CD Integration

This project is ready for GitHub Actions. See `.github/workflows/playwright.yml` for setup.

### GitHub Actions Features

- ✅ Multi-browser testing (Chromium, Firefox)
- ✅ Artifact uploads (test results, videos, traces)
- ✅ HTML report generation
- ✅ Automatic retry on CI (2 retries)
- ✅ Single worker on CI (no flakiness)

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Support](https://playwright.dev/docs/typescript)
- [POM Pattern](https://wiki.saucelabs.com/display/TESTCENTER/Page+Object+Model+Framework+Tutorial)

---

## 👨‍💻 Author

**Playwright QA Automation Engineer**

Portfolio project demonstrating:

- Enterprise-level testing architecture
- Professional code organization
- Best practices in test automation
- CI/CD ready setup

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Feel free to fork and improve! Key areas:

- Add more test scenarios
- Integrate with real API
- Add performance tests
- Visual regression testing

---

**Last Updated:** May 22, 2026  
**Playwright Version:** 1.60.0+  
**Node Version:** 18+
