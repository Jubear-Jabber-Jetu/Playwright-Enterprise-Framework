# Playwright Enterprise Framework

A scalable, maintainable test automation framework designed for enterprise applications. This framework combines browser automation, API validation, and BDD-driven workflows into a single, cohesive testing platform built on industry-standard tooling and proven architectural patterns.

The framework is structured to support cross-functional collaboration between QA engineers, developers, and product stakeholders. Gherkin-based scenarios provide a shared language for requirements, while the underlying implementation enforces separation of concerns, reusability, and consistent execution across local and CI environments.

---

## Features

| Capability | Description |
|---|---|
| **Playwright** | Cross-browser end-to-end automation with built-in auto-waiting, network interception, and reliable element handling across Chromium, Firefox, and WebKit. |
| **Cucumber BDD** | Behavior-driven development support using Gherkin syntax. Scenarios serve as living documentation and executable specifications aligned with business requirements. |
| **Page Object Model** | UI interactions are encapsulated in dedicated page classes, reducing duplication and isolating locator maintenance from test logic. |
| **API Testing** | Native HTTP client modules for service-layer validation, enabling fast feedback loops and hybrid UI/API test strategies within the same suite. |
| **Parallel Execution** | Worker-based test distribution for reduced cycle time. Suites are designed to run concurrently without shared-state conflicts. |
| **CI/CD Ready** | GitHub Actions workflow structure included. Pipelines support headless execution, artifact publishing, and integration with standard reporting outputs. |

---

## Architecture

The framework follows a layered architecture that separates test orchestration from implementation details. Each layer has a defined responsibility, making the codebase easier to onboard, extend, and maintain at scale.

```
Playwright-Enterprise-Framework
│
├── src
│   ├── pages       # Page Object Model — UI locators and interaction methods
│   ├── fixtures    # Custom Playwright fixtures for dependency injection
│   ├── utils       # Shared helpers, data generators, and common utilities
│   ├── api         # API clients, request builders, and response validators
│   └── database    # Database connection handlers and query utilities
│
├── tests           # Feature files, step definitions, and test specifications
├── reports         # Generated HTML, JSON, and Cucumber report artifacts
├── .github
│   └── workflows   # CI/CD pipeline definitions
│
├── README.md
└── package.json
```

### Layer Responsibilities

**Tests Layer**
The entry point for all test execution. Feature files written in Gherkin are mapped to step definitions, which delegate business actions to page objects, API modules, or utility functions. Tests should remain thin and readable.

**Page Object Model (`src/pages`)**
Each page or component is represented as a class containing locators and interaction methods. Tests never reference raw selectors directly. When the UI changes, updates are confined to a single page class.

**Fixtures (`src/fixtures`)**
Custom Playwright fixtures extend the test context with pre-configured dependencies such as authenticated sessions, test data, or environment-specific configuration. Fixtures promote setup reuse and consistent test preconditions.

**API Layer (`src/api`)**
Dedicated modules for REST and GraphQL interactions. API tests can run independently for fast regression coverage or be composed with UI flows for end-to-end validation across the full application stack.

**Utilities (`src/utils`)**
Cross-cutting helpers including date/time formatters, file readers, retry logic, logging wrappers, and environment configuration loaders.

**Database Layer (`src/database`)**
Optional data setup and teardown utilities for scenarios requiring direct database validation or seed data management. Supports pre-condition verification and post-execution state assertions.

### Execution Flow

```
Feature File (Gherkin)
        │
        ▼
Step Definitions
        │
        ├──► Page Objects ──► Browser (Playwright)
        ├──► API Modules  ──► HTTP Services
        └──► Database     ──► Data Store
        │
        ▼
   Test Report (HTML / JSON)
```

### Design Principles

- **Single Responsibility** — Each module owns one concern. Page objects handle UI; API modules handle services; step definitions orchestrate.
- **DRY (Don't Repeat Yourself)** — Shared logic lives in fixtures and utilities, not duplicated across test files.
- **Environment Agnostic** — Configuration is externalized. The same test suite runs against local, staging, and production-like environments via environment variables.
- **Fail Fast, Report Clearly** — Assertions produce actionable failure messages. Reports capture screenshots, traces, and structured logs on failure.

---

## Installation

### Prerequisites

| Requirement | Minimum Version |
|---|---|
| Node.js | 18.x or later |
| npm | 9.x or later |
| Git | 2.x or later |

### Setup

1. Clone the repository:

```bash
git clone https://github.com/<your-org>/Playwright-Enterprise-Framework.git
cd Playwright-Enterprise-Framework
```

2. Install project dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

4. Configure environment variables:

```bash
cp .env.example .env
```

Update `.env` with values appropriate to your target environment:

```env
BASE_URL=https://your-application-url.com
API_BASE_URL=https://your-api-url.com
HEADLESS=true
WORKERS=4
```

5. Verify the installation:

```bash
npx playwright --version
```

---

## Running Tests

### Local Execution

| Command | Description |
|---|---|
| `npm test` | Run the full test suite in headless mode |
| `npm run test:headed` | Run tests with the browser UI visible |
| `npm run test:ui` | Launch the Playwright Test UI for interactive debugging |
| `npm run report` | Open the latest HTML report |

### Targeted Execution

Run a specific feature or spec file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests matching a tag or grep pattern:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```

Run against a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Parallel Execution

Parallelism is controlled via the `WORKERS` environment variable or Playwright configuration. Increase worker count to reduce total execution time on multi-core machines:

```bash
WORKERS=4 npm test
```

For CI pipelines, worker count should be aligned with available runner resources to avoid memory contention and flaky timeouts.

### Debugging

```bash
# Run with Playwright Inspector
npx playwright test --debug

# Run a single test in headed mode with slow motion
npx playwright test tests/login.spec.ts --headed --slow-mo=500
```

On failure, Playwright automatically captures screenshots, video recordings, and trace files. Traces can be inspected with:

```bash
npx playwright show-trace trace.zip
```

---

## Reporting

The framework produces structured, shareable reports suitable for both technical and non-technical stakeholders.

### Report Types

| Report | Location | Purpose |
|---|---|---|
| HTML Report | `reports/html/` | Primary report for local review and CI artifact publishing. Includes pass/fail summary, step-level detail, screenshots, and traces. |
| JSON Report | `reports/json/` | Machine-readable output for integration with dashboards, quality gates, and third-party analytics tools. |
| Cucumber Report | `reports/cucumber/` | BDD-formatted report mapping Gherkin scenarios to execution results for stakeholder review. |

### Viewing Reports

After a test run, open the HTML report:

```bash
npm run report
```

In CI/CD pipelines, reports are published as build artifacts and retained for a configurable number of days to support failure triage and trend analysis.

### CI Integration

GitHub Actions workflows under `.github/workflows/` execute the test suite on every pull request and merge to the main branch. Failed runs attach report artifacts to the workflow summary, enabling reviewers to inspect failures without a local reproduction.

---

## Future Enhancements

The following capabilities are planned to extend framework coverage and operational maturity:

| Enhancement | Description |
|---|---|
| **Visual Regression Testing** | Integrate screenshot comparison tooling to detect unintended UI changes across releases. Baseline management and diff review workflows included. |
| **Accessibility (a11y) Testing** | Automated WCAG compliance checks using axe-core integration within Playwright test flows. |
| **Test Data Management** | Centralized test data factory with support for dynamic data generation, database seeding, and API-based setup/teardown. |
| **Multi-Environment Matrix** | Configuration profiles for dev, staging, UAT, and production-like environments with environment-specific secrets management. |
| **Slack / Teams Notifications** | Post-execution summaries delivered to team channels with pass rate, duration, and direct links to failed test reports. |
| **Performance Benchmarking** | Lightweight performance assertions on critical user journeys including page load time, API response latency, and Core Web Vitals. |
| **Mobile & Responsive Testing** | Device emulation profiles and viewport configurations for mobile-first application coverage. |
| **Dockerized Execution** | Containerized test runner for consistent execution across developer machines and CI agents without local browser dependencies. |
| **Quality Gate Integration** | SonarQube or similar integration to enforce minimum pass rates and block merges on critical test failures. |
| **Allure Reporting** | Rich, interactive reporting with historical trend analysis, severity categorization, and epic/feature grouping aligned with BDD structure. |

---

## Contributing

1. Create a feature branch from `main`.
2. Follow existing naming conventions for page objects, step definitions, and utility modules.
3. Ensure all tests pass locally before opening a pull request.
4. Include relevant tags (`@smoke`, `@regression`) on new scenarios to support selective execution.

---

## License

This project is intended for internal and portfolio use. Refer to the repository license file for terms of distribution and modification.
