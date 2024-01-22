import { Page } from "@playwright/test";

export default class Table {
    constructor(private readonly page: Page) { }


    async getColumnIndex(columnname: string, tableLocator: string): Promise<number> {
        const table = await this.page.$(tableLocator);
        const headerContent = await table?.$$eval('th', ths => ths.map(th => th.textContent));
        const index_of_header = headerContent?.findIndex(th => th === columnname);

        let columnIndex = 0;
        if (index_of_header != null) {
            columnIndex = index_of_header + 1;
        }

        return columnIndex;
    }

    async getAllColumnContent(columnname: string, tableLocator: string) {

        const columnIndex = await this.getColumnIndex(columnname, tableLocator);
        const columnElement = this.page.locator(`` + tableLocator + `//td[${columnIndex}]`);
        const columnContents = await columnElement.locator(':scope').allInnerTexts();
        return columnContents;
    }


}