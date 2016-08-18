describe(
  'App', () => {
    beforeEach(
      () => {
        browser.get('/reception');
      }
    );

    it(
      'should have a title', () => {
        let subject = browser.getTitle();
        let result = 'DNCR';
        expect(subject).toEqual(result);
      }
    );
  }
);
