import { $, $$, browser, ExpectedConditions as EC } from 'protractor';

export class TopStoriesPage {
  get() {
    browser.get('');
    browser.wait(EC.presenceOf($('app-top-stories')), 5000);
  }

  scrollDown() {
    browser.executeScript('document.getElementsByTagName("ion-infinite-scroll")[0].scrollIntoView();');
    browser.sleep(5000);
  }

  getStoriesCount() {
    browser.wait(EC.presenceOf($('app-item')), 5000);
    return $$('app-top-stories app-item').count();
  }
}
