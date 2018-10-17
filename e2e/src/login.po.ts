import { browser, element, by, $ } from 'protractor';

export class LogInPage {
  get() {
    browser.get('');
    browser.sleep(5000);

    this.gotoLogin();
  }

  gotoLogin() {
    $('#btnShowLogin').click();
    browser.sleep(2000);
  }

  logIn(email: string = 'a@b.com', password: string = 'password') {
    element(by.css_sr('ion-input::sr input[name=email]')).sendKeys(email);
    element(by.css_sr('ion-input::sr input[name=password]')).sendKeys(password);
    $('#btnLogin').click();
    browser.sleep(5000);
  }

  canLogIn() {
    return $('#btnShowLogin').isPresent();
  }

  isLoggedIn() {
    return $('#btnLogout').isPresent();
  }

  logOut() {
    $('#btnLogout').click();
    browser.sleep(1000);
  }
}
