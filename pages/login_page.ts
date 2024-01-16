import { Locator, Page, expect } from "@playwright/test";

export default class LoginPage {
    readonly repoCbx: Locator = this.page.locator('#repository');
    readonly usernameTxt: Locator = this.page.locator('#username');
    readonly passwordTxt: Locator = this.page.locator('#password');
    readonly loginBtn: Locator = this.page.locator('.btn-login');
    constructor(private readonly page: Page) { }


    async gotoLoginPage(): Promise<void> {
        await this.page.goto('http://localhost/TADashboard/login.jsp');

    }

    async enterUsername(username: string) {
        await this.usernameTxt.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordTxt.fill(password);
    }

    async selectRepository(repo: string) {
        await this.repoCbx.selectOption(repo);
    }

    async login(username: string, password: string, repo?: string): Promise<void> {
        if (repo !== null && repo !== undefined) await this.selectRepository(repo);
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.loginBtn.click();
    }
}