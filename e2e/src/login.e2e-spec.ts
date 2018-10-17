import { LogInPage } from './login.po';

describe('user', () => {
  it('should be able to log in and log out', () => {
    const loginPage = new LogInPage();
    loginPage.get();
    expect(loginPage.canLogIn()).toBe(true);
    loginPage.logIn();
    expect(loginPage.isLoggedIn()).toBe(true);
    loginPage.logOut();
    expect(loginPage.canLogIn()).toBe(true);
  });
});
