import { RPPage } from './app.po';

describe('rp App', () => {
  let page: RPPage;

  beforeEach(() => {
    page = new RPPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
