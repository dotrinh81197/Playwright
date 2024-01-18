import { test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';
import DataProfilePage from '../pages/data_profile_page';
import Table from '../elements/table';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});


test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.gotoDataProfilePage();
    const dataProfilePage = new DataProfilePage(page);
    const tableExample = new Table(page);
  console.log(tableExample.getValue(4,4));


    
})