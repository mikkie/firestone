<template>
  <div class="batch_ydls_startegy">
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
                maxlength="350"
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
                maxlength="350"
                id="code"
                v-model="strategy.parameters.code"
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
              <label for="desc">描述:</label>
            </b-col>
            <b-col lg="4">
              <b-form-input
                size="sm"
                maxlength="50"
                id="desc"
                v-model="strategy.parameters.desc"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="max_stock_percent">妖股涨幅:</label>
            </b-col>
            <b-col lg="4">
              <b-form-input
                size="sm"
                maxlength="11"
                id="max_stock_percent"
                v-model="strategy.parameters.max_stock_percent"
              ></b-form-input>
            </b-col>
            <b-col lg="4">
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="4">
              <label for="open_percent">开盘涨幅:</label>
            </b-col>
            <b-col lg="1">
              <label for="open_percent_low">最低:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.open_percent_low"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="open_percent_high">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                type="number"
                step="0.1"
                min="-10.0"
                max="10.0"
                v-model="strategy.parameters.open_percent_high"
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
  name: "batch_ydls_startegy",
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