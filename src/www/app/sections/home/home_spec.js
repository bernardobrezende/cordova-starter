'use strict';

describe('home', function() {
  it('should have a heading text', function() {
    browser.get('http://localhost:9000/');

    var result = element(by.binding('heading')).getText();

    expect(result).toBe('Hello Cordova!');
  });
});