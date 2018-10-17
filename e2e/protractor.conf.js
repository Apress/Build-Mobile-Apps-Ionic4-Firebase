// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 15000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  beforeLaunch() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    browser.waitForAngularEnabled(false);

    // The css_sr selector is copied from https://github.com/angular/protractor/issues/4367.
    // The related PR (https://github.com/angular/protractor/pull/4786/) is not merged yet.
    by.addLocator('css_sr', (cssSelector, opt_parentElement, opt_rootSelector) => {
      let selectors = cssSelector.split('::sr');
      if (selectors.length === 0) {
        return [];
      }
      let shadowDomInUse = (document.head.createShadowRoot || document.head.attachShadow);
      let getShadowRoot  = (el) => ((el && shadowDomInUse) ? el.shadowRoot : el);
      let findAllMatches = (selector, targets, firstTry) => {
        let using, i, matches = [];
        for (i = 0; i < targets.length; ++i) {
          using = (firstTry) ? targets[i] : getShadowRoot(targets[i]);
          if (using) {
            if (selector === '') {
              matches.push(using);
            } else {
              Array.prototype.push.apply(matches, using.querySelectorAll(selector));
            }
          }
        }
        return matches;
      };

      let matches = findAllMatches(selectors.shift().trim(), [opt_parentElement || document], true);
      while (selectors.length > 0 && matches.length > 0) {
        matches = findAllMatches(selectors.shift().trim(), matches, false);
      }
      return matches;
    });
  }
};
