import { test, expect } from '@playwright/test';
import { allure } from "allure-playwright";
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    await allure.logStep("Step1: Go to Login Page");
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await allure.logStep("Step2: Login with valid credential");
    await loginPage.login('administrator', '');
    const dashboardMainPage = new DashboardMainPage(page);
    await allure.logStep("Step3: Verify TA Dashboard main page is display");

    await dashboardMainPage.verifyDashboardPagedisplays();

});

test('Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('invalid', 'invalid');
    const message = "Username or password is invalid";
    await loginPage.verifyModalMessage(message);

});


