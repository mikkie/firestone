// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.login')
      .assert.containsText('h2', 'Firestone')
  },
  'login tests': function (browser) {

    browser
      .setValue('input[id=username]', 'aqua')
      .setValue('input[id=password]', '123456')
      .click('button[id=login]')
      .pause(2000)
      .assert.containsText('.mainmenu div.desc', '同花顺模拟账号进行交易.')
    browser.expect.element('#history').to.not.be.present
    browser.expect.element('#account').to.not.be.present
    browser.expect.element('#mockRealSwitch').to.not.be.present
    browser.expect.element('#exit').to.be.present
    browser.end()
  }
}
