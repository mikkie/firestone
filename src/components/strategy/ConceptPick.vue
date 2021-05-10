<template>
  <div class="basic_startegy">
    <b-container>
      <b-row no-gutters>
        <b-col lg="6">
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">股票代码:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="6"
                id="code"
                plaintext
                v-model="strategy.parameters.code"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">执行日期:</label>
            </b-col>
            <b-col lg="4">
              <b-form-input
                size="sm"
                type="date"
                id="executeDate"
                v-model="strategy.parameters.executeDate"
              ></b-form-input>
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
              <b-form-input
                type="time"
                size="sm"
                v-model="strategy.parameters.monitorTime.start"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="code">结束:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                type="time"
                size="sm"
                v-model="strategy.parameters.monitorTime.end"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">指数涨幅:</label>
            </b-col>
            <b-col lg="1">
              <label for="code">最低:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.index_percent"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="index_max_percent">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.index_max_percent"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="open_percent">开盘涨幅:</label>
            </b-col>
            <b-col lg="1">
              <label for="min_open_percent">最低:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.min_open_percent"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="max_open_percent">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.max_open_percent"
              ></b-form-input>
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
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.stock_percent"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="concepts">热门概念:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="50000"
                id="concepts"
                v-model="strategy.parameters.concepts"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="company_count">公司数量:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="1000"
                id="company_count"
                v-model="strategy.parameters.company_count"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="net_buy">净买入:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="1000"
                id="net_buy"
                v-model="strategy.parameters.net_buy"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="min_percent">最低涨幅:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="10"
                id="min_percent"
                v-model="strategy.parameters.min_percent"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="max_percent">最大涨幅:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="10"
                id="max_percent"
                v-model="strategy.parameters.max_percent"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="max_concept">概念数量:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="10"
                id="max_concept"
                v-model="strategy.parameters.max_concept"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="monitor_count">选取数量:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="10"
                id="monitor_count"
                v-model="strategy.parameters.monitor_count"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="top_concept">概念强弱:</label>
            </b-col>
            <b-col
              lg="4"
            >
              <b-form-input
                size="sm"
                maxlength="10"
                id="top_concept"
                v-model="strategy.parameters.top_concept"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="volume">买入总额(元):</label>
            </b-col>
            <b-col lg="4">
              <b-form-input
                size="sm"
                maxlength="11"
                id="volume"
                v-model="strategy.parameters.volume"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="strategy">监控策略:</label>
            </b-col>
            <b-col lg="4">
              <b-form-input
                size="sm"
                maxlength="24"
                id="strategy"
                v-model="strategy.parameters.strategyId"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="12">
              <b-button
                v-if="this.getItemFromLocalStorage('basic_params').from == 'history'"
                v-on:click="save"
                variant="primary"
                id="save_strategy"
              >确定</b-button>
              <b-button
                v-else
                v-on:click="save"
                variant="primary"
                id="save_strategy"
              >保存</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="6">
          <div id="desc">
            <b-card
              bg-variant="light"
              text-variant="dark"
              :header="strategy.name"
              class="text-center"
            >
              <b-card-text v-html="strategy.description"></b-card-text>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "basic_strategy",
  data() {
    return {
      strategy: {
        parameters: {
          monitorTime: {},
          index_percent: {},
          percent: {},
          executeDate: ""
        }
      }
    };
  },
  created: function() {
    this.$data.localStorage = window.localStorage
    this.$emit("login", true);
    let basic_params = this.$route.params;
    if (!basic_params) {
      basic_params = this.getItemFromLocalStorage("basic_params");
    }
    this.setItemToLocalStorage("basic_params", basic_params);
    api.get(`/strategy/${basic_params.strategyId}`).then(res => {
      if (res) {
        this.$data.strategy = res;
        if (basic_params.mockTrade) {
          this.$data.strategy.parameters = basic_params.mockTrade.params;
        } else {
          let exeDate = new Date();
          if (exeDate.getHours() >= 15) {
            exeDate.setDate(exeDate.getDate() + 1);
          }
          this.$data.strategy.parameters.executeDate = `${exeDate.getFullYear()}-${('0' + (exeDate.getMonth() + 1)).slice(-2)}-${('0' + exeDate.getDate()).slice(-2)}`;
        }
      }
    });
  },
  methods: {
    isMockTrade(){
      return this.$parent.$data.isMock == true;
    },
    setItemToLocalStorage(key, item){
      this.$data.localStorage.setItem(key, JSON.stringify(item))
    },
    getItemFromLocalStorage(key){
      let itemString = this.$data.localStorage.getItem(key)
      return JSON.parse(itemString)
    },
    save(evt) {
      let that = this;
      let from = this.getItemFromLocalStorage("basic_params").from;
      let mockTrade = this.getItemFromLocalStorage("basic_params").mockTrade;
      if (from == "history") {
        let his_url = this.isMockTrade() ? "/historym" : "/history"
        this.$router.push({ path: his_url });
        return;
      }
      /*create a new mockTrade*/
      let url = this.isMockTrade() ? "/mocktrade" : "/trade"
      let dest_url = this.isMockTrade() ? "/homem" : "/home"
      if (mockTrade == null) {
        api
          .post(url + "/new", {
            accesstoken: this.$cookies.get("accesstoken"),
            strategyId: this.getItemFromLocalStorage("basic_params").strategyId,
            params: this.$data.strategy.parameters
          })
          .then(r => {
            if (r.code == that.$data.strategy.parameters.code) {
              this.$router.push({ path: dest_url });
            }
          });
      } else {
      /*update a mockTrade*/
        let update_data = {
          accesstoken: this.$cookies.get("accesstoken"),
          update: {
            params: this.$data.strategy.parameters
          }
        }
        if(this.isMockTrade()){
          update_data['mocktradeid'] = mockTrade._id
        }
        else{
          update_data['tradeid'] = mockTrade._id
        }
        api
          .post(url, update_data)
          .then(r => {
            if (r.code == that.$data.strategy.parameters.code) {
              this.$router.push({ path: dest_url });
            }
          });
      }
    }
  }
};
</script>
<style>
.row {
  margin-top: 10px;
}
#desc {
  padding-left: 10px;
}
#desc p {
  text-align: left;
}
</style>