import { browser, element, by } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;
  const EC = browser.ExpectedConditions;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should add new album', async() => {
    page.navigateTo();
    browser.sleep(2000);
    
    await page.getBtnAddNewAlbum().click();
    browser.sleep(1000);
    let txtTitle = page.getTitleText();
    txtTitle.sendKeys('a name');

    let txtYear = page.getYearText();
    txtYear.sendKeys(2021);

    let lstArtistId = page.getLstArtistText();
    lstArtistId.sendKeys(1);
    browser.sleep(1000);
    await page.getLstArtistText().click().then(() => {
      element(by.cssContainingText('mat-option .mat-option-text', 'Marvin Gaye')).click();
      browser.sleep(2000);
      page.getDialoUpdate().click().then(() => {
        browser.sleep(4000);
      });
    })
  });

  it('should not add duplicate album', async() => {
    page.navigateTo();
    browser.sleep(2000);
    
    await page.getBtnAddNewAlbum().click();
    browser.sleep(1000);
    let txtTitle = page.getTitleText();
    txtTitle.sendKeys('a name');

    let txtYear = page.getYearText();
    txtYear.sendKeys(2021);

    let lstArtistId = page.getLstArtistText();
    lstArtistId.sendKeys(1);
    browser.sleep(1000);
    await page.getLstArtistText().click().then(() => {
      element(by.cssContainingText('mat-option .mat-option-text', 'Marvin Gaye')).click();
      browser.sleep(2000);
      page.getDialoUpdate().click().then(() => {
        browser.sleep(4000);
      });
    })
  });

  it('should update album', async() => {
    page.navigateTo();
    browser.sleep(2000);
    
    await page.getEditRecord().click();
    browser.sleep(2000);
    let txtTitle = page.getTitleText();
    txtTitle.sendKeys('aa name');
    browser.sleep(1000);

    page.getDialoUpdate().click().then(() => {
        browser.sleep(4000);
      });
  });

  it('should delete album', async() => {
    page.navigateTo();
    browser.sleep(2000);
    
    await page.getDeleteRecord().click();
    browser.sleep(2000);

    page.getBtnDeleteRecord().click().then(() => {
        browser.sleep(4000);
      });
  });

});
