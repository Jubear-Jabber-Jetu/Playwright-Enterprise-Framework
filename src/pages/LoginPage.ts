import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly logoutButton: Locator;

  private readonly loginPath = '/practice-test-login/';
  private readonly successUrlFragment = 'logged-in-successfully';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
    this.logoutButton = page.getByRole('link', { name: 'Log out' });
  }

  async open(): Promise<void> {
    await this.page.goto(this.loginPath);
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(this.successUrlFragment));
    await expect(this.page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  async verifyErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(expectedText);
  }
}
