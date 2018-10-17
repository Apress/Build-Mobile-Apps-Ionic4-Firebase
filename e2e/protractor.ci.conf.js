const parentConfig = require('./protractor.conf').config;

exports.config = Object.assign(parentConfig, {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=800x600', '--no-sandbox'],
    }
  }
});
