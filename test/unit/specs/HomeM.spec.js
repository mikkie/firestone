import Vue from 'vue'
import HomeM from '@/components/HomeM'

describe('HomeM.vue', () => {
  let vm = null;
  beforeEach(()=>{
    const Constructor = Vue.extend(HomeM)
    vm = new Constructor({
        data : {
            items : [
              {checked: false, code: '005688', strategy: '基础策略', state: '未开始', result: '无' },
              {checked: false, code: '300234', strategy: '基础策略', state: '未开始', result: '无' },
              {checked: false, code: '600879', strategy: '基础策略', state: '未开始', result: '无' },
              {checked: false, code: '600889', strategy: '基础策略', state: '未开始', result: '无' }
            ]
        }
    }).$mount()
  });
  it('should render correct contents', (done) => {
    Vue.nextTick(()=>{
      expect(vm.$el.querySelector('.homem h5').textContent)
        .to.equal('模拟交易');
      expect(vm.$el.querySelectorAll('tbody tr').length)
        .to.equal(4);
      done();
    });
  });
  describe('delete items', () => {
    it('delete without selected', done => {
      vm.deleteItem();
      Vue.nextTick(()=>{
        expect(vm.$el.querySelectorAll('tbody tr').length)
          .to.equal(4); 
        done();  
      });
    });
    /* it('delete with one selected', done => {
      vm.$data.items[2].checked = true;
      vm.deleteItem();
      Vue.nextTick(()=>{
        expect(vm.$el.querySelectorAll('tbody tr').length)
          .to.equal(3);
        done();   
      });
    }); */
  });
  /* it('boot item', done => {
    vm.$data.items[2].checked = true;
    vm.bootItem(); 
    Vue.nextTick(()=>{
      expect(vm.$el.querySelector('tbody tr:nth-child(3) td:nth-child(4)').textContent)
        .to.equal('运行中'); 
      done();  
    });
  });
  it('pause item', done => {
    vm.$data.items[2].checked = true;
    vm.pauseItem(); 
    Vue.nextTick(()=>{
      expect(vm.$el.querySelector('tbody tr:nth-child(3) td:nth-child(4)').textContent)
        .to.equal('暂停');
      done();   
    });
  }); */
  describe('check all items', () => {
    it('check all set', () => {
      vm.check_all(true);
      for(let i in vm.$data.items){
        expect(vm.$data.items[i].checked).to.equal(true);
      }
    });
  });
});