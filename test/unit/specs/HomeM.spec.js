import Vue from 'vue'
import HomeM from '@/components/HomeM'

describe('HomeM.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HomeM)
    const vm = new Constructor({
        data : {
            items : [
              {checked: true, code: '005688', strategy: '基础策略', state: '运行中', result: '无' },
              {checked: true, code: '300234', strategy: '基础策略', state: '停止', result: '无' },
              {checked: false, code: '600879', strategy: '基础策略', state: '运行中', result: '无' },
              {checked: false, code: '600889', strategy: '基础策略', state: '运行中', result: '无' }
            ]
        }
    }).$mount()
    expect(vm.$el.querySelector('.homem h5').textContent)
      .to.equal('模拟交易')
    expect(vm.$el.querySelectorAll('tbody tr').length)
      .to.equal(4)
    expect(vm.$el.querySelector('tbody tr:nth-child(2) td input').value)
      .to.equal('true')
  })
})