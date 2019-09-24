// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'login tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .maximizeWindow()
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.login')
      .assert.containsText('h2', 'Firestone')
      .setValue('input[id=username]', 'aqua')
      .setValue('input[id=password]', '123456')
      .click('button[id=login]')
  },
  'mainmenu tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('.mainmenu div.desc', '同花顺模拟账号进行交易.')
    browser.expect.element('#history').to.not.be.present
    browser.expect.element('#account').to.not.be.present
    browser.expect.element('#mockRealSwitch').to.not.be.present
    browser.expect.element('#exit').to.be.present
    browser.click('button[id=mock_btn]')
  },
  'config tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('h5', '模拟交易设置')
    browser.expect.element('#history').to.be.present
    browser.expect.element('#account').to.be.present
    browser.expect.element('#mockRealSwitch').to.be.present
    browser.expect.element('#exit').to.be.present
    browser
      .setValue('input[id=buy_count]', 3)
      .click('button[id=available_amount]')
  },
  'home tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('h5', '模拟交易')
    browser.expect.element('#history').to.be.present
    browser.expect.element('#account').to.be.present
    browser.expect.element('#mockRealSwitch').to.be.present
    browser.expect.element('#exit').to.be.present
    //no item selected
    browser.click('#boot_item').pause(500)
    browser.expect.element('div[role="alert"]').to.be.present
    //boot item
    browser.execute("document.querySelector('tbody tr:nth-child(1) td:nth-child(1) input').click()");
    browser.pause(500)
    browser
      .click('#boot_item')
      .pause(500)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(4)', '运行中')
    //stop item  
    browser
      .click('#stop_item')
      .pause(500)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(4)', '停止')
    //del item  
    browser
      .click('#del_item')
      .pause(500)
      .click('#del_item_modal button.btn-primary')
      .pause(500)  
      .assert.elementCount('tbody tr', 2)
    //new item
    browser.execute("document.querySelector('tbody tr:nth-child(1) td:nth-child(1) input').click()");
    browser
      .click('#new_item')
      .pause(500)
      .click('#modal button.btn-primary')
  },
  'basic strategy tests': function (browser){
    browser
      .pause(2000)
      .assert.containsText('#desc .card-header div', '基础策略')
    browser.click('#save_strategy').pause(2000)  
    browser.click('#history') 
  },
  'history tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('h5', '模拟交易记录')
      .end()
  }
}
