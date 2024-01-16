import { test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const randomstring = require("randomstring");
    const newPage = randomstring.generate(7);

    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
    await dashboardMainPage.addPage(newPage);

    await dashboardMainPage.verifyNewPageCreated({ newPage });

    await dashboardMainPage.deletePage(newPage);

    await dashboardMainPage.verifyPageDeleted(newPage);
})