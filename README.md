# 🎭 Playwright

## Documentation | API reference
Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

Headless execution is supported for all browsers on all platforms. Check out system requirements for details.


## Installation
Playwright has its own test runner for end-to-end tests, we call it Playwright Test.

## Using init command
The easiest way to get started with Playwright Test is to run the init command.

```Shell
# Run from your project's root directory
npm init playwright@latest
# Or create a new project
npm init playwright@latest new-project
```

### Manually

Add dependency and install browsers.

```Shell
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

## Resources

## Run allure report
Installation allure-playwright
```Shell
 npm i -D @playwright/test allure-playwright 
 npm install -g allure-commandline --save dev
# Run Test
npx playwright test --reporter=line,allure-playwright

# Generate Allure Report:
 allure generate allure-results -o allure-report --clean
# Open Allure Report:
 allure open allure-report

```

* [Documentation](https://playwright.dev/docs/intro)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)