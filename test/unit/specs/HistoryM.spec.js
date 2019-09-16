import Vue from 'vue'
import HistoryM from '@/components/HistoryM'

describe('HistoryM.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HistoryM)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.historym h5').textContent)
      .to.equal('模拟交易记录')
  })
})