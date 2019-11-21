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
      .clearValue('input[id=buy_count]')
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
    /*browser.execute("document.querySelector('tbody tr:nth-child(1) td:nth-child(1) input').click()");
    browser.pause(500)
    browser
      .click('#boot_item')
      .pause(500)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(4)', '运行中')
    //pause item  
    browser
      .click('#pause_item')
      .pause(500)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(4)', '暂停')*/
    //del item  
    browser.execute("document.querySelector('tbody tr:nth-child(1) td:nth-child(1) input').click()");
    browser.execute("document.querySelector('tbody tr:nth-child(3) td:nth-child(1) input').click()");
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
  'basic strategy tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('#desc .card-header div', '基础策略')
      .assert.containsText('#desc .card-text', '在监控时间范围内,当大盘涨幅处于指定范围，并且当前个股涨幅处于指定范围，则买入股票')
    browser.setValue('input[id=code]', '300336').pause(1000)
      .click('#save_strategy').pause(2000)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(2)', '300336')
    browser.click('tbody tr:nth-child(1) td:nth-child(3) a').pause(1000)
      .assert.value('div input:nth-child(1)','300336')
    browser.click('#save_strategy').pause(1000)
    //new item
    browser
      .click('#new_item')
      .pause(500)
      .click('#select_strategy option[value="5da19b7d181fc3600c5544c3"]')
      .pause(500)
      .click('#modal button.btn-primary')
  },
  'ydls strategy tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('#desc .card-header div', '异动拉升')
      .assert.containsText('#desc .card-text', '在监控时间范围内,当大盘涨幅处于指定范围，并且当前个股涨幅处于指定范围，在涨速时间内，涨幅，成交额达到预期值则买入股票')
    browser.setValue('input[id=code]', '600093').pause(1000)
      .click('#save_strategy').pause(2000)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(2)', '600093')
    browser.click('tbody tr:nth-child(1) td:nth-child(3) a').pause(1000)
      .assert.value('div input:nth-child(1)','600093')
    browser.click('#history')
  },
  'history tests': function (browser) {
    browser
      .pause(2000)
      .assert.containsText('h5', '模拟交易记录')
    browser
      .setValue('div input:nth-child(1)','300692')
      // .execute("document.querySelector('input[type=\"date\"]').value = '2019-09-15'").pause(1000)
      .click('form .btn').pause(1500)
      .assert.elementCount('tbody tr', 1)
      .assert.containsText('tbody tr:nth-child(1) td:nth-child(2)', '300692')
      .end()
  }
}
