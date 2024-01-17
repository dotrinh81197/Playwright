import { test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});

test.afterEach(async ({ page }) => {

});


test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const randomstring = require("randomstring");
    const newPageName = randomstring.generate(7);
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
    await dashboardMainPage.addPage(newPageName);

    await dashboardMainPage.verifyNewPageCreated(newPageName);

    //post condition
    // await dashboardMainPage.deletePage(newPageName);
    await dashboardMainPage.verifyPageDeleted(newPageName);
})

