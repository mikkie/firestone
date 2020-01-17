<template>
  <div class="ydls_startegy">
    <b-container>
      <b-row no-gutters>
        <b-col lg="6">
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">股票代码:</label>
            </b-col>
            <b-col
              lg="4"
              v-if="this.$cookie && this.getItemFromLocalStorage('basic_params').mockTrade != null"
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
              <label for="code">买入总额(元):</label>
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
              <label for="code">大盘涨幅:</label>
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
                v-model="strategy.parameters.index_percent.low"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="code">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.index_percent.high"
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
                v-model="strategy.parameters.percent.low"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="code">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.percent.high"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">资金异动:</label>
            </b-col>
            <b-col lg="1">
              <label for="code">分钟:</label>
            </b-col>
            <b-col lg="1">
              <b-form-input
                size="sm"
                type="number"
                step="0.5"
                min="1"
                max="5"
                v-model="strategy.parameters.speed.time"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <label for="code">成交(万):</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="1"
                min="10"
                max="50000"
                v-model="strategy.parameters.speed.amount"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="other">其他参数:</label>
            </b-col>
            <b-col lg="2">
              <label for="other">大盘比例:</label>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="0"
                max="10"
                v-model="strategy.parameters.speed.ratio_l"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="0"
                max="10"
                v-model="strategy.parameters.speed.ratio_r"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="12">
              <b-button
                v-if="this.$cookie && this.getItemFromLocalStorage('basic_params').from == 'history'"
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
        this.$router.push({ path: "/historym" });
        return;
      }
      /*create a new mockTrade*/
      if (mockTrade == null) {
        api
          .post("/mocktrade/new", {
            accesstoken: this.$cookies.get("accesstoken"),
            strategyId: this.getItemFromLocalStorage("basic_params").strategyId,
            params: this.$data.strategy.parameters
          })
          .then(r => {
            if (r.code == that.$data.strategy.parameters.code) {
              this.$router.push({ path: "/homem" });
            }
          });
      } else {
      /*update a mockTrade*/
        api
          .post("/mocktrade", {
            accesstoken: this.$cookies.get("accesstoken"),
            mocktradeid: mockTrade._id,
            update: {
              params: this.$data.strategy.parameters
            }
          })
          .then(r => {
            if (r.code == that.$data.strategy.parameters.code) {
              this.$router.push({ path: "/homem" });
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