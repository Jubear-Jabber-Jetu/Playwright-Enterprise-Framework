import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { loginTestData } from '../src/utils/testData';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Positive LogIn test @smoke', async () => {
    const { username, password } = loginTestData.validUser;

    await loginPage.login(username, password);
    await loginPage.verifySuccessfulLogin();
  });

  test('Negative username test @regression', async () => {
    const { username, password } = loginTestData.invalidUser;

    await loginPage.login(username, password);
    await loginPage.verifyErrorMessage(loginTestData.errorMessages.invalidUsername);
  });

  test('Negative password test @regression', async () => {
    const { username, password } = loginTestData.invalidPassword;

    await loginPage.login(username, password);
    await loginPage.verifyErrorMessage(loginTestData.errorMessages.invalidPassword);
  });
});
