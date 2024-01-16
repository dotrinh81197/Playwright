import { Page, Locator, expect } from "@playwright/test";

export default class DashboardMainPage {
  readonly globalSettingLnk: Locator = this.page.locator('li').filter({ hasText: 'Global Setting Add Page' }).getByRole('link').first();
  readonly addPageLnk: Locator = this.page.getByRole('link', { name: 'Add Page' });
  readonly deletePageLnk: Locator = this.page.getByRole('link', { name: 'Delete' });
  readonly pageNameTxt: Locator = this.page.locator("#name");
  readonly parentPageCbx: Locator = this.page.locator("#parent");
  readonly columnNumberCbx: Locator = this.page.locator("#columnnumber");
  readonly displayAfterCbx: Locator = this.page.locator("#afterpage");
  readonly publicCb: Locator = this.page.locator("#ispublic");
  readonly OKbtn: Locator = this.page.locator("#OK");
  readonly Cancelbtn: Locator = this.page.locator("#Cancel");


  constructor(public page: Page) { }

  async displays(): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).toHaveText('Execution Dashboard');
  }

  async addPage(pageName: string, parentName?: string, numColumn?: string, displayAfter?: string, isPublic?: boolean): Promise<void> {
    await this.hoverGlobalSettingLink();

    await this.addPageLnk.click();
    await this.pageNameTxt.fill(pageName);
    if (parentName !== null && parentName !== undefined) {
      await this.parentPageCbx.selectOption(parentName);
    }
    if (numColumn !== null && numColumn !== undefined) {
      await this.columnNumberCbx.selectOption(numColumn);
    }
    if (displayAfter !== null && displayAfter !== undefined) {
      await this.displayAfterCbx.selectOption(displayAfter);
    }
    if (isPublic == true) {
      await this.publicCb.isChecked();
    }

    await this.OKbtn.click();

  }

  async hoverGlobalSettingLink(): Promise<void> {
    await this.globalSettingLnk.hover();

  }

  async gotoPageName(pageName: string): Promise<void> {
    await this.page.getByRole('link', { name: pageName }).click();

  }

  async deletePage(pageName: string, errorMessage?: string): Promise<void> {
    await this.gotoPageName(pageName);
    await this.hoverGlobalSettingLink();
    this.page.on('dialog', dialog => dialog.accept());
    await this.deletePageLnk.click();

    if (errorMessage !== null && errorMessage !== undefined) {
      this.page.on('dialog', async dialog => {
               expect((dialog.message())).toEqual(errorMessage);
        dialog.dismiss();

      })
    }
  }





  async verifyNewPageCreated({ newPage }: { newPage: string; }): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).toHaveText(newPage);
    await expect(this.page.getByRole('link', { name: newPage })).toBeVisible();

  }

  async verifyPageDeleted(newPage: string): Promise<void> {
    await expect(this.page.locator('#main-menu li.active a.active')).not.toHaveText(newPage);
  }

  async deleteAllPage(): Promise<void> {
    //   const pageChild = this.page.locator('xpath=//li//a[@class="haschild"]');
    //   const pageHasChild = this.page.locator('xpath=//li[@class="haschild"]');

    // for (let i = 0; i < await pageHasChild.count(); i++) {
    //   await this.page.locator('xpath=//li[@class="haschild"]').hover();
    //   pageHasChild.nth(i).hover();

    //   await this.hoverGlobalSettingLink();
    //   await this.deletePageLnk.click();
    //   this.page.on('dialog', dialog => dialog.accept());
    // }

  }
}