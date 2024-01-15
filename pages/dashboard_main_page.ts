import { Page,Locator, expect } from "@playwright/test";

export default class DashboardMainPage {
  readonly globalSetting: Locator = this.page.locator('.mn-setting');
  readonly addPage: Locator = this.page.locator("'Add Page'");
  readonly pageNameTxt: Locator = this.page.locator("#name");
  readonly parentPageCbx: Locator = this.page.locator("#parent");
  readonly columnNumberCbx: Locator = this.page.locator("#columnnumber");
  readonly displayAfterCbx: Locator = this.page.locator("#afterpage");
  readonly publicCb: Locator = this.page.locator("#ispublic");
  readonly OKbtn: Locator = this.page.locator("#OK");
  readonly Cancelbtn: Locator = this.page.locator("#Cancel");








 

  








  constructor(public page: Page) {}

  async displays(): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
  }


}