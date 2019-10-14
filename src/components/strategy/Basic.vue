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
              <b-form-input
                size="sm"
                id="code"
                v-model="strategy.parameters.code"
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
                v-model="strategy.parameters.index_percent.low"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="code">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
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
                v-model="strategy.parameters.percent.low"
              ></b-form-input>
            </b-col>
            <b-col lg="1">
              <label for="code">最高:</label>
            </b-col>
            <b-col lg="3">
              <b-form-input
                size="sm"
                v-model="strategy.parameters.percent.high"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col lg="12">
              <b-button
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
    let strategyId = this.$route.params.strategyId;
    if (!strategyId) {
      strategyId = this.$cookies.get("create_strategy_id");
    }
    this.$cookies.set("create_strategy_id", strategyId);
    api.get(`/strategy/${strategyId}`).then(res => {
      if (res) {
        this.$data.strategy = res;
      }
    });
  },
  methods: {
    save(evt) {
      let that = this;  
      api
        .post("/mocktrade/new", {
          accesstoken: this.$cookies.get("accesstoken"),
          strategyId: this.$cookies.get("create_strategy_id"),
          params: this.$data.strategy.parameters
        })
        .then(r => {
          if (r.code == that.$data.strategy.parameters.code) {
            this.$router.push({ path: "/homem" });
          }
        });
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