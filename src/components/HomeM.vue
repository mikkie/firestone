<template>
  <div class="homem">
    <h5>模拟交易</h5>
    <b-container>
      <div>
        <b-form inline class="toobar">
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <b-button variant="success" size="md" v-b-modal.modal>新建</b-button>
          <b-button variant="danger" size="md">删除</b-button>
          <b-button variant="warning" size="md">启动</b-button>
          <b-button variant="info" size="md">停止</b-button>
        </b-form>
      </div>
      <div>
        <b-table striped hover :fields="fields" :items="items">
           <template v-slot:cell(index)="data">
              <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
           </template>
           <template v-slot:cell(strategy)="data">  
             <b-link href="void(0)" v-on:click="goBasic">{{ data.value }}</b-link>
           </template>  
        </b-table>  
      </div>
    </b-container>
    <b-modal id="modal" title="选择策略">
      <b-form inline>
        <b-form-select v-model="selected_bs" :options="options_bs"></b-form-select>
        <b-form-select v-model="selected_startegy" :options="options_startegy"></b-form-select>
      </b-form>
      <template v-slot:modal-ok="ok">
         确定
      </template>
      <template v-slot:modal-cancel="cancel">
         取消
      </template>
    </b-modal> 
  </div>
</template>
<script>
export default {
  name: "home_m",
  data() {
      return {
        fields: [
            {
                key : 'index',
                label : '选中'
            },
            {
                key : 'code',
                label : '代码'
            },
            {
                key : 'strategy',
                label : '策略'
            },
            {
                key : 'state',
                label : '状态'
            },
            {
                key : 'result',
                label : '交易结果'
            }
        ],  
        items: [
          {code: '005688', strategy: '基础策略', state: '运行中', result: '无' },
          {code: '300234', strategy: '基础策略', state: '停止', result: '无' },
          {code: '600879', strategy: '基础策略', state: '运行中', result: '无' },
        ],
        selected_bs: 'buy',
        options_bs: [
          { value: 'buy', text: '买' },
          { value: 'sell', text: '卖' },
        ],
        selected_startegy: 'basic',
        options_startegy: [
          { value: 'basic', text: '基础策略' },
          { value: 'advanced', text: '打板策略' },
        ],
      }
    },
  methods: {  
    goBasic(evt) {
      evt.preventDefault()
      this.$router.push({ path:'/strategy/basic' })
    }
  }
};
</script>
<style>
  .toobar button {
     margin: 3px; 
  }
</style>


