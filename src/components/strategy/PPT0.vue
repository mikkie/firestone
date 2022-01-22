<template>
  <div class="ppt0_startegy">
    <b-container>
      <b-row no-gutters>
        <b-col lg="6">
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">股票代码:</label>
            </b-col>
            <b-col
              lg="4"
              v-if="this.getItemFromLocalStorage('basic_params').mockTrade != null"
            >
              <b-form-input
                size="sm"
                maxlength="6"
                id="code"
                plaintext
                v-model="strategy.parameters.code"
              ></b-form-input>
            </b-col>
            <b-col
              lg="4"
              v-else
            >
              <b-form-input
                size="sm"
                maxlength="6"
                id="code"
                v-model="strategy.parameters.code"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">买入数量(股):</label>
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
              <label for="start_buy_line">下跌:</label>
            </b-col>
            <b-col lg="2">
              <label for="start_buy_line">跌幅:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.start_buy_line"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="buy_on_low_limit">跌停:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.buy_on_low_limit"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="yest_price">反弹:</label>
            </b-col>
            <b-col lg="2">
              <label for="min_rebound">最低:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.min_rebound"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="max_rebound">最高:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.max_rebound"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="speed">涨速异动:</label>
            </b-col>
            <b-col lg="2">
              <label for="time_2">分钟:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.5"
                min="1"
                max="5"
                v-model="strategy.parameters.speed.time_2"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="percent">涨幅(万):</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="1"
                min="10"
                max="50000"
                v-model="strategy.parameters.speed.percent"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="money">资金异动:</label>
            </b-col>
            <b-col lg="2">
              <label for="time">分钟:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.5"
                min="1"
                max="5"
                v-model="strategy.parameters.money.time"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="amount">成交(万):</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="1"
                min="10"
                max="50000"
                v-model="strategy.parameters.money.amount"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="sell">止盈:</label>
            </b-col>
            <b-col lg="2">
              <label for="stop_win">涨幅:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                maxlength="5"
                id="stop_win"
                v-model="strategy.parameters.stop_win"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="drop_from_high">回调:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                maxlength="5"
                id="drop_from_high"
                v-model="strategy.parameters.drop_from_high"
              ></b-form-input>
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
  name: "ydls_startegy",
  data() {
    return {
      strategy: {
        parameters: {
          monitorTime: {},
          index_percent: {},
          percent: {},
          speed: {},
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
      if(this.$data.strategy.parameters.code.trim().length == 0){
        this.$emit("tips", "danger", "请输入股票代码");
        return;
      } 
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