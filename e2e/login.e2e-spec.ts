import { LoginPage } from './login.po';

describe('ng-training Login', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should login', async () => {
    await page.navigateTo();
    await page.logIn();
    expect(page.getNavbarUserName()).toBe('Test User');
  });

});
