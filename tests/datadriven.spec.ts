import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import LoginPage from '../pages/login_page';

import fs from 'fs';

const testDataPath = 'G:/Playwright/data/credentile.json';
const testData = JSON.parse(fs.readFileSync(testDataPath,'utf8'));

for (const user of testData) {
    test(`Verify user can not login with invalid credentials ${user.number}`, async ({ page }) => {
        await allure.logStep("Step1: Go to Login Page");
        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await allure.logStep("Step2: Login with invalid credential");
        await loginPage.login(user.username, user.password);
       
        page.once('dialog', dialog => {
            expect.soft(dialog.message().trim()).toEqual(user.message);
            dialog.dismiss();
          })
    
    });
}

