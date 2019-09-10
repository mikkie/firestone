import Vue from 'vue'
import ConfigM from '@/components/ConfigM'

describe('ConfigM.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ConfigM)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.configm h5').textContent)
      .to.equal('模拟交易设置')
  })
})
