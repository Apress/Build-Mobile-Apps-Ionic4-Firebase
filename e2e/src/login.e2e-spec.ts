import { LogInPage } from './login.po';

describe('user', () => {
  it('should be able to log in and log out', () => {
    const loginPage = new LogInPage();
    loginPage.get();
    loginPage.logIn();
    expect(loginPage.isLoggedIn()).toBeTruthy();
    loginPage.logOut();
    expect(loginPage.canLogIn()).toBeTruthy();
  });
});
