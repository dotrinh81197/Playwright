import { Locator, Page, expect } from "@playwright/test";
import Table from "../elements/table";

export default class DataProfilePage {
    readonly administratorHeaderLink: Locator = this.page.getByRole('link', { name: 'Administer' });
    private tableLocator = 'xpath=//table';

    constructor(public readonly page: Page) { }

    async verifyDataProfileContent(columName: string, columnContents: string[]){
        console.log(columnContents);

        const dataTable = new Table(this.page);
        const dataArray = dataTable.getAllColumnContent(columName,this.tableLocator);
        console.log(dataArray);

        expect(dataArray).toEqual(columnContents);
    }

}