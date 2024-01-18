import { expect, test } from '@playwright/test';
import LoginPage from '../pages/login_page';
import DashboardMainPage from '../pages/dashboard_main_page';

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('administrator', '');
});


test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {

    const randomstring = require("randomstring");
    const pageHasChild = randomstring.generate(5);
    const dashboardMainPage = new DashboardMainPage(page);
    await dashboardMainPage.displays();
    await dashboardMainPage.addPage(pageHasChild);

    const childPage = randomstring.generate(7);
    await dashboardMainPage.addPage(childPage, pageHasChild);
    const confirmMessage = 'Are you sure you want to remove this page?';
    const errorMessage = "Cannot delete page" + " '" + pageHasChild + "' " + "since it has child page(s).";
    //delete page and verify message when delete page has child
    await dashboardMainPage.deletePageAndVerifyDialogMessage(pageHasChild, undefined, confirmMessage, errorMessage);

    //delete child page
    await dashboardMainPage.deletePageAndVerifyDialogMessage(childPage, pageHasChild, confirmMessage);
    await dashboardMainPage.verifyPageDeleted(childPage);


   //delete parent page
    await dashboardMainPage.deletePageAndVerifyDialogMessage(pageHasChild, undefined,confirmMessage);
    await dashboardMainPage.verifyPageDeleted(pageHasChild);

    //verify Delete link for Overview page is not display
    await dashboardMainPage.gotoPageName("Overview");
    await dashboardMainPage.hoverGlobalSettingLink();
    await expect(dashboardMainPage.deletePageLnk).not.toBeVisible();

})