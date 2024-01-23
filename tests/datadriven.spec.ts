import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import LoginPage from '../pages/login_page';
import invalidUsers from'../data/credentile.json';

for (const user of invalidUsers) {
    test(`Verify user can not login with invalid credentials ${user.number}`, async ({ page }) => {
        await allure.logStep("Step1: Go to Login Page");
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await allure.logStep("Step2: Login with invalid credential");
        await loginPage.login(user.username, user.password);
       
        await loginPage.verifyModalMessage(user.message);

    
    });
}


