# QA Automation Framework — Playwright + TypeScript

[![Playwright Tests](https://github.com/woroshilka/qa-automation-playwright-ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/woroshilka/qa-automation-playwright-ts/actions/workflows/playwright.yml)

Enterprise-level test automation framework built with **Playwright** and **TypeScript**, targeting [SauceDemo](https://www.saucedemo.com).

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | E2E, visual, accessibility, network testing |
| TypeScript (strict mode) | Type-safe test development |
| Allure | Rich test reporting with history |
| @axe-core/playwright | WCAG 2.1 A/AA accessibility audits |
| Docker | Reproducible execution environment |
| GitHub Actions | CI matrix across Chromium, Firefox, API, Visual |

---

## Project Structure

```
src/
├── api/
│   ├── clients/apiClient.ts        # Typed HTTP wrapper (GET, POST, PUT, DELETE, PATCH)
│   ├── services/
│   │   ├── users.service.ts        # User CRUD (jsonplaceholder.typicode.com)
│   │   └── auth.service.ts         # Auth endpoints (dummyjson.com)
│   └── endpoints.ts                # Centralized endpoint registry
├── ui/
│   ├── pages/
│   │   ├── base/BasePage.ts        # Navigation + shared helpers
│   │   ├── auth/LoginPage.ts
│   │   ├── inventory/InventoryPage.ts
│   │   ├── cart/CartPage.ts
│   │   ├── checkout/CheckoutPage.ts
│   │   └── product/ProductPage.ts
│   └── selectors.ts                # Centralized CSS selectors
├── utils/
│   ├── env.ts                      # Environment config
│   ├── logger.ts                   # Structured logging (error/warn/info/debug)
│   └── testData.ts                 # Test fixtures and data sets
├── fixtures/test.fixture.ts        # Custom Playwright fixtures
└── auth/global.setup.ts            # Session bootstrapping

tests/
├── ui/                             # login, inventory, cart (data-driven sorting)
├── e2e/checkout.spec.ts            # Full checkout flow + form validation
├── smoke/login.smoke.spec.ts       # Health-check smoke suite
├── api/users.spec.ts               # CRUD + auth token tests
├── accessibility/accessibility.spec.ts  # Axe-core WCAG audits + keyboard nav
├── visual/visual.spec.ts           # Screenshot regression (4 pages)
└── network/network-mock.spec.ts    # Route interception + perf budget
```

---

## Quick Start

```bash
git clone https://github.com/woroshilka/qa-automation-playwright-ts.git
cd qa-automation-playwright-ts
npm install
cp .env.example .env
```

### Environment Variables (`.env`)

```env
BASE_URL=https://www.saucedemo.com
API_URL=https://jsonplaceholder.typicode.com
AUTH_URL=https://dummyjson.com
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
TIMEOUT=30000
LOG_LEVEL=info
```

---

## Running Tests

```bash
# All tests
npm test

# By category
npm run test:ui          # UI tests (Chromium + Firefox)
npm run test:api         # API + auth tests
npm run test:e2e         # E2E checkout flows
npm run test:smoke       # Smoke suite

# Debug
npm run test:headed      # Browser visible
npm run test:ui          # Interactive UI mode

# Reports
npm run report           # Open HTML report
npx allure generate allure-results --clean && npx allure open
```

---

## Docker

```bash
# Build image
docker build -t playwright-tests .

# Run all tests
docker run --rm playwright-tests

# Run specific project
docker run --rm playwright-tests npx playwright test --project=chromium
```

---

## Test Categories

| Category | Tests | Tags |
|---|---|---|
| Login (UI) | 5 | @regression |
| Inventory (UI, data-driven) | 9 | @regression |
| Cart (UI) | 5 | @regression |
| Checkout E2E + validation | 8 | @regression |
| Smoke | 2 | @smoke |
| API — CRUD + auth | 9 | @api |
| Accessibility (axe-core) | 5 | @a11y |
| Visual regression | 4 | @visual |
| Network interception | 6 | @regression |
| Performance (glitch user, budgets) | 4 | @regression |

---

## Architecture Highlights

**Page Object Model** — all pages extend `BasePage`, which handles navigation and shared helpers. Selectors are centralized in `selectors.ts` so test code never hardcodes CSS strings.

**API Layer** — `ApiClient` is a thin typed wrapper around Playwright's `APIRequestContext`. `UsersService` and `AuthService` add business-level methods on top, keeping tests declarative.

**Fixtures** — custom `test.fixture.ts` injects fully-constructed page objects into every test, eliminating boilerplate instantiation.

**Session reuse** — `global.setup.ts` authenticates once and writes `storageState.json`; all UI tests reuse the persisted session.

**Data-driven tests** — inventory sorting is parameterized over all four sort options, so adding a new variant is one line.

---

## CI/CD

GitHub Actions runs a matrix job across four projects in parallel:

```
chromium → UI + E2E + accessibility + network tests
firefox  → UI + E2E tests
api      → API + auth tests
visual   → Screenshot regression tests
```

Allure results from all jobs are merged and published as a single artifact. Test results (traces, videos) are uploaded on failure for debugging.

---

## Author

**Pavlo Kuturiy** — QA Automation Engineer  
GitHub: [woroshilka](https://github.com/woroshilka)
