import { expect, test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const randomstring = require("randomstring");
    const newPage = randomstring.generate(5);
    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
    await dashboardMainPage.addPage(newPage);

    const childPage = randomstring.generate(7);
    await dashboardMainPage.addPage(childPage, newPage);
    const errorMessage = "Cannot delete page" + "'" + childPage + "'" + "since it has child(s) pageaaaaaa";
    await dashboardMainPage.deletePage(newPage, errorMessage);
    
})