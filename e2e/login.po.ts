import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/user/login');
  }

  public logIn() {
    element(by.xpath('/html/body/app-root/div/app-login/form/div[1]/input'))
      .sendKeys('test@example.com');
    element(by.xpath('/html/body/app-root/div/app-login/form/div[2]/input'))
      .sendKeys('secret');
    return element(by.buttonText('Log In')).click();
  }

  public getNavbarUserName() {
    return element(by.css('.navbar-right > li:first-child')).getText();
  }

}
