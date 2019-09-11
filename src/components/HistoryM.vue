<template>
  <div class="historym">
    <h5>模拟交易记录</h5>
    <b-container>
      <div>
        <b-form inline class="toobar">
          <b-form-input
              placeholder="代码"
              type="text"
            ></b-form-input>
          <b-button variant="success" size="md">查询</b-button>
        </b-form>
      </div>
      <div>
        <b-table striped hover :fields="fields" :items="items">
           <template v-slot:cell(strategy)="data">  
             <b-link href="#foo">{{ data.value }}</b-link>
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
                key : 'code',
                label : '代码'
            },
            {
                key : 'strategy',
                label : '策略'
            },
            {
                key : 'result',
                label : '交易结果'
            }
        ],  
        items: [
          {code: '005688', strategy: '基础策略', result: '无' },
          {code: '300234', strategy: '基础策略', result: '无' },
          {code: '600879', strategy: '基础策略', result: '无' },
        ]
      }
    }
};
</script>
<style>
</style>


