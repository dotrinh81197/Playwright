import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {

    await page.goto("http://localhost/TADashboard/login.jsp");

    const loginPage = new LoginPage(page);
    await loginPage.login('administrator', '');
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();

});

test('Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials', async ({ page }) => {

    await page.goto("http://localhost/TADashboard/login.jsp");

    const loginPage = new LoginPage(page);
    await loginPage.login('invalid', 'invalid');

    page.on('dialog', dialog => expect((dialog.message()).match("Username or password is invalid")));

    page.on('dialog', dialog => dialog.accept());

});


