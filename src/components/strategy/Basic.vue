<template>
  <div class="basic_startegy">
    <b-container>
      <b-row no-gutters>
        <b-col lg="6">
          <b-row no-gutters>
            <b-col lg="4">
              <label for="code">股票代码:</label>
            </b-col>
            <b-col lg="4" v-if="this.$cookies && this.$cookies.get('basic_params').mockTrade != null">
              <b-form-input
                size="sm"
                maxlength="6"
                id="code"
                plaintext
                v-model="strategy.parameters.code"
              ></b-form-input>
            </b-col>
            <b-col lg="4" v-else>
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
                maxlength="6"
                id="volume"
                v-model="strategy.parameters.volume"
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
            <b-col lg="12">
              <b-button
                v-if="this.$cookies && this.$cookies.get('basic_params').from == 'history'"
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
          parameters : {
              monitorTime : {},
              index_percent : {},
              percent : {}
          }
      }
    };
  },
  created: function() {
    this.$emit("login", true);
    let basic_params = this.$route.params;
    if (!basic_params) {
      basic_params = this.$cookies.get("basic_params");
    }
    this.$cookies.set("basic_params", basic_params);
    api.get(`/strategy/${basic_params.strategyId}`).then(res => {
      if (res) {
        this.$data.strategy = res;
        if(basic_params.mockTrade){
          this.$data.strategy.parameters = basic_params.mockTrade.params;
        }
      }
    });
  },
  methods: {
    save(evt) {
      let that = this;  
      let from = this.$cookies.get("basic_params").from;
      let mockTrade = this.$cookies.get("basic_params").mockTrade;
      if(from == 'history'){
        this.$router.push({ path: "/historym" });
        return;
      }
      /*create a new mockTrade*/
      if(mockTrade == null){
        api
          .post("/mocktrade/new", {
            accesstoken: this.$cookies.get("accesstoken"),
            strategyId: this.$cookies.get("basic_params").strategyId,
            params: this.$data.strategy.parameters
          })
          .then(r => {
            if (r.code == that.$data.strategy.parameters.code) {
              this.$router.push({ path: "/homem" });
            }
          });
      }
      /*update a mockTrade*/
      else{
        api.post("/mocktrade", {
          accesstoken: this.$cookies.get("accesstoken"),
          mocktradeid: mockTrade._id,
          update: {
            params : this.$data.strategy.parameters
          }
        }).then(r => {
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