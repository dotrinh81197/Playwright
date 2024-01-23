import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./data_profile_page";

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
  readonly administratorHeaderLink: Locator = this.page.getByRole('link', { name: 'Administer' });
  readonly pannelLink: Locator = this.page.getByRole('link', { name: 'Panels', exact: true });
  readonly dataProfilLink: Locator = this.page.getByRole('link', { name: 'Data Profiles'});




  constructor(public page: Page) { }

  async verifyDashboardPagedisplays(): Promise<void> {
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


  async gotoPannelPage(): Promise<void> {
    await this.administratorHeaderLink.hover();
    await this.pannelLink.click();
  }

  async gotoDataProfilePage(): Promise<void> {
    await this.administratorHeaderLink.hover();
    await this.dataProfilLink.click();
  }



  async gotoPageName(pageName: string, parentPage?: string): Promise<void> {
    if (parentPage !== undefined && parentPage !== null) {
      await this.page.getByRole('link', { name: parentPage }).hover();
    }
    await this.page.getByRole('link', { name: pageName }).click();

  }

  async deletePageAndVerifyDialogMessage(pageName: string, parentPage?: string, confirmMessage?: string, errorMessage?: string): Promise<void> {
    if (parentPage !== undefined && parentPage !== null) {
      await this.gotoPageName(pageName, parentPage);
    }
    else { await this.gotoPageName(pageName); }

    await this.hoverGlobalSettingLink();

    //verify dialog messages
    this.page.once('dialog', dialog => {
      dialog.accept();
      expect.soft(dialog.message().trim()).toEqual(confirmMessage);

      if (errorMessage !== null && errorMessage !== undefined) {
        this.page.once('dialog', async dialog2 => {
          expect.soft(dialog2.message().trim()).toEqual(errorMessage);
          dialog2.dismiss();
        })
      }
    })

    await this.deletePageLnk.click();

  }


  async verifyNewPageCreated(newPage: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: newPage })).toBeVisible();

  }

  async verifyPageDeleted(pageName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: pageName })).not.toBeVisible();
    await expect(this.page.locator('#main-menu li.active a.active')).not.toHaveText(pageName);
  }

  async removePage(pageName: string, parentName?: string): Promise<void> {
    if (parentName !== null && parentName !== undefined) {
      await this.page.getByRole('link', { name: parentName }).hover();
    }

    await this.page.getByRole('link', { name: pageName }).click();
    await this.hoverGlobalSettingLink();

    this.page.once('dialog', async dialog => {
      await dialog.accept();
    })

    await this.deletePageLnk.click();
  }

}