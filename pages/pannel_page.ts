import { Locator, Page, expect } from "@playwright/test";

export default class PannelPage {
    readonly administratorHeaderLink: Locator = this.page.getByRole('link', { name: 'Administer' });
    readonly pannelLink: Locator = this.page.getByRole('link', { name: 'Panels', exact: true });
    readonly addNewPannelLink: Locator = this.page.locator('xpath=//div[@class="panel_tag2"]//a').first();
    readonly deleteLink: Locator = this.page.locator('.panel_tag2').getByRole('link', { name: 'Delete' });

    readonly addNewPannelModal: Locator = this.page.locator('.ui-dialog editpanelDlg');
    readonly overlaydiv: Locator = this.page.locator('xpath=//div[@class="ui-dialog-overlay custom-overlay"]');


    constructor(private readonly page: Page) { }

    async clickAddNew(){
        await this.addNewPannelLink.click();
    }

    async verifyModalPannelDisplay(){
        await expect.soft(this.addNewPannelModal).toBeVisible();

    }

    async verifyModalOverlapDisplay(){
        await expect.soft(this.overlaydiv).toBeVisible();

    }
}