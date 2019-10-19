import Vue from 'vue'
import Basic from '@/components/strategy/Basic'

describe('Basic.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Basic)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('.basic_startegy label')[0].textContent)
      .to.equal('股票代码:')
    expect(vm.$el.querySelectorAll('.basic_startegy label')[1].textContent)
      .to.equal('监控时间:')
    expect(vm.$el.querySelectorAll('.basic_startegy label')[4].textContent)
      .to.equal('大盘涨幅:')
    expect(vm.$el.querySelectorAll('.basic_startegy label')[7].textContent)
      .to.equal('个股涨幅:')
  })
})