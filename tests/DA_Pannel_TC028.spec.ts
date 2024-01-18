import { expect, test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';
import PannelPage from '../pages/pannel_page';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});


test('Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.gotoPannelPage();
    const pannelPage = new PannelPage(page);

    await pannelPage.clickAddNew();
    await expect.soft(pannelPage.addNewPannelModal).toBeVisible();
    await expect.soft(pannelPage.overlaydiv).toBeVisible();

})

