<template>
  <div class="basic_startegy">
     <b-container>
        <b-row no-gutters>
           <b-col lg="6">
              <b-row no-gutters>
                <b-col lg="4">
                   <label for="code">股票代码:</label>
                </b-col>
                <b-col lg="4">
                    <b-form-input size="sm"></b-form-input> 
                </b-col>
                <b-col lg="4">
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col lg="4">
                   <label for="code">监控时间:</label>
                </b-col>
                <b-col lg="1">
                    <label for="code">起始:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input type="time" size="sm"></b-form-input> 
                </b-col>
                <b-col lg="1">
                    <label for="code">结束:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input type="time" size="sm"></b-form-input> 
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col lg="4">
                   <label for="code">大盘涨幅:</label>
                </b-col>
                <b-col lg="1">
                    <label for="code">最低:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input size="sm"></b-form-input>
                </b-col>
                <b-col lg="1">
                    <label for="code">最高:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input size="sm"></b-form-input>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col lg="4">
                   <label for="code">个股涨幅:</label>
                </b-col>
                <b-col lg="1">
                    <label for="code">最低:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input size="sm"></b-form-input>
                </b-col>
                <b-col lg="1">
                    <label for="code">最高:</label> 
                </b-col>
                <b-col lg="3">
                    <b-form-input size="sm"></b-form-input>
                </b-col>
              </b-row>
              <b-row no-gutters>
                <b-col lg="12">
                   <b-button v-on:click="save"  variant="primary">保存</b-button>
                </b-col>
              </b-row>
           </b-col> 
           <b-col lg="6">
              <div id="desc">
                <b-card bg-variant="light" text-variant="dark" header="基础策略" class="text-center">
                   <b-card-text>在<i>监控时间</i>范围内，当<i>大盘涨幅</i>在指定范围内，<i>个股涨幅</i>在指定范围内则执行买入</b-card-text>
                </b-card>
              </div>
           </b-col>
        </b-row>
     </b-container>
  </div> 
</template>
<script>
export default {
    name: "basic_strategy",
    data() {
      return {
      };
    },
    created: function () {
      this.$emit("login", true);
    },
    methods: {
      save(evt) {
        this.$router.push({ path:'/homem' })
      }
    }
}
</script>
<style>
.row {
  margin-top: 10px;
}
#desc {
    padding-left:10px;
}
#desc p{
  text-align: left;
}
</style>