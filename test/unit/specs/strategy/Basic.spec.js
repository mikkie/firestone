import Vue from 'vue'
import Basic from '@/components/strategy/Basic'

describe('Basic.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Basic)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#desc .card-header div').textContent)
      .to.equal('基础策略')
  })
})