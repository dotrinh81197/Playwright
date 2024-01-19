import { Locator, Page } from "@playwright/test";

export default class PannelPage {
    readonly administratorHeaderLink: Locator = this.page.getByRole('link', { name: 'Administer' });
    readonly pannelLink: Locator = this.page.getByRole('link', { name: 'Panels', exact: true });
    readonly addNewPannelLink: Locator = this.page.locator('xpath=//div[@class="panel_tag2"]//a').first();
    readonly deleteLink: Locator = this.page.locator('xpath=//div[@class="panel_tag2"]').getByRole('link', { name: 'Delete' });

    readonly addNewPannelModal: Locator = this.page.locator('xpath=//div[@class="ui-dialog editpanelDlg"]');
    readonly overlaydiv: Locator = this.page.locator('xpath=//div[@class="ui-dialog-overlay custom-overlay"]');


    constructor(private readonly page: Page) { }

    async clickAddNew(): Promise<void> {
        await this.addNewPannelLink.click();
    }

}