import { Locator, Page, expect } from "@playwright/test";
import Table from "../elements/table";

export default class DataProfilePage {
    readonly administratorHeaderLink: Locator = this.page.getByRole('link', { name: 'Administer' });
    private tableLocator = 'xpath=//table[@class="GridView"]';

    constructor(public readonly page: Page) { }

    async verifyDataProfileContent(columName: string, columnContents?: Object): Promise<void> {
        const dataTable = new Table(this.page);
        const dataArray = await dataTable.getAllColumnContent(columName, this.tableLocator);
        const dataProfileArray: string[] = [];
        for (let index = 0; index < dataArray.length; index++) {
             dataProfileArray.push(dataArray[index]);

        }

            expect(dataProfileArray) == (columnContents);
    }

}