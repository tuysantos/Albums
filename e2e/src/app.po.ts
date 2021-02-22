import { browser, by, element } from 'protractor';

export class AppPage {
  // async navigateTo(): Promise<unknown> {
  //   return browser.get(browser.baseUrl);
  // }

  navigateTo() {
    return browser.get('/');
  }

  // async getTitleText(): Promise<string> {
  //   return element(by.css('app-root .content span')).getText();
  // }

  getBtnAddNewAlbum() {
    return element(by.id("btnAddNew"));
  }

  getDialoUpdate() {
    return element(by.id("btnUpdate"));
  }

  getDialoCancel() {
    return element(by.id("btnCancel"));
  }

  getTitleText(){
    return element(by.id('txtTitle'));
  }

  getYearText(){
    return element(by.id('txtYear'));
  }

  getLstArtistText(){
    return element(by.id('lstArtistId'));
  }

  getEditRecord(){
    return element(by.id('tdEdit'));
  }

  getDeleteRecord(){
    return element(by.id('tdDelete'));
  }

  getBtnDeleteRecord(){
    return element(by.id('btnDeleteRecord'));
  }
  
}