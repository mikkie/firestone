import Vue from 'vue'
import MainMenu from '@/components/MainMenu'

describe('MainMenu.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MainMenu)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.mainmenu b-card-text').textContent)
      .to.equal('同花顺模拟账号进行交易.')
  })
})
