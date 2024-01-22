import { Locator, expect, test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';
import DataProfilePage from '../pages/data_profile_page';
import Table from '../element/tablehandle';
import assert from 'assert';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});

test('Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.gotoDataProfilePage();
    const dataProfilePage = new DataProfilePage(page);

    const dataTable = new Table(page);
    const dataFromLocator = await dataTable.getAllColumnContent('Data Profile', dataProfilePage.tableLocator);
    const dataSort = dataFromLocator?.slice().sort();
    console.log(dataFromLocator);
    console.log(dataSort);

    expect((JSON.stringify(dataFromLocator)) == (JSON.stringify(dataSort)));


});