import Vue from 'vue'
import Ydls from '@/components/strategy/Ydls'

describe('Ydls.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Ydls)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('.ydls_startegy label')[0].textContent)
      .to.equal('股票代码:')
    expect(vm.$el.querySelectorAll('.ydls_startegy label')[2].textContent)
      .to.equal('监控时间:')
    expect(vm.$el.querySelectorAll('.ydls_startegy label')[5].textContent)
      .to.equal('大盘涨幅:')
    expect(vm.$el.querySelectorAll('.ydls_startegy label')[8].textContent)
      .to.equal('个股涨幅:')
      expect(vm.$el.querySelectorAll('.ydls_startegy label')[11].textContent)
      .to.equal('异动涨速:')
  })
})