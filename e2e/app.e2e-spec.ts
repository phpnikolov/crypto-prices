import { CryptoPricePage } from './app.po';

describe('crypto-price App', () => {
  let page: CryptoPricePage;

  beforeEach(() => {
    page = new CryptoPricePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
