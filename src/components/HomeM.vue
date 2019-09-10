<template>
  <div class="homem">
    <h5>模拟交易</h5>
    <b-container>
      <div>
        <b-form inline class="toobar">
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"></b-form-checkbox>
          <b-button variant="success" size="md">新建</b-button>
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
        </b-table>  
      </div>
    </b-container>
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
        ]
      }
    }
};
</script>
<style>
  .toobar button {
     margin: 3px; 
  }
</style>


