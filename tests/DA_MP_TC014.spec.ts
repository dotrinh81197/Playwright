import { test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';
import Utilities from '../utitlities';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});


test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
   
    const utitlities = new Utilities();
    const newPageName = utitlities.getRandomPageName(7);
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.verifyDashboardPagedisplays();
    await dashboardMainPage.addPage(newPageName);

    await dashboardMainPage.verifyNewPageCreated(newPageName);

    //post condition
    await dashboardMainPage.removePage(newPageName);
    await dashboardMainPage.verifyPageDeleted(newPageName);
})

