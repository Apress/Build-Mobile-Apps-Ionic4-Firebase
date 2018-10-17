import { $, $$, browser, by } from 'protractor';
import { LogInPage } from './login.po';

export class FavoritesPage {
  logInPage: LogInPage = new LogInPage();

  get() {
    this.logInPage.get();
    this.logInPage.logIn();
  }

  viewFavorites() {
    $('#btnShowFavorites').click();
    browser.sleep(5000);
  }

  addToFavorite() {
    const itemElem = $$('app-top-stories app-item').filter(elem => {
      return elem.$('.btnLike').isPresent();
    }).first();
    if (itemElem) {
      const title = itemElem.$('h2').getText();
      itemElem.$('.btnLike').click();
      browser.sleep(5000);
      return title;
    }
    return null;
  }

  isInFavorites(title: string) {
    this.viewFavorites();
    expect($$('app-favorites-list h2').map(elem => elem.getText())).toContain(title);
  }
}
