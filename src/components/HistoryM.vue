<template>
  <div class="historym">
    <h5>模拟交易记录</h5>
    <b-container>
      <div>
        <b-form
          inline
          class="toobar"
        >
          <b-form-input
            placeholder="代码"
            type="text"
            maxlength="6"
            v-model="code"
          ></b-form-input>
          <b-form-input
            type="date"
            v-model="createdDate"
          ></b-form-input>
          <b-button
            variant="success"
            size="md"
            v-on:click="queryHistoryData"
          >查询</b-button>
        </b-form>
      </div>
      <div>
        <b-table
          striped
          hover
          :fields="fields"
          :items="items"
          @row-hovered="setCurrentRow"
        >
          <template v-slot:cell(code)="data">
            {{ data.value.substring(0,30) }}
          </template>
          <template v-slot:cell(strategy)="data">
            <b-link
              href="javascript:void(0)"
              v-on:click="goToStrategy"
            >{{ data.value }}</b-link>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "home_m",
  created: function() {
    this.$emit("login", true);
    this.$data.createdDate = this.formatDate(new Date());
    this.queryStrategies();
    this.queryHistoryData();
  },
  data() {
    return {
      code: "",
      createdDate: null,
      fields: [
        {
          key: "createDate",
          label: "时间"
        },
        {
          key: "code",
          label: "代码"
        },
        {
          key: "strategy",
          label: "策略"
        },
        {
          key: "op",
          label: "操作"
        },
        {
          key: "result",
          label: "交易结果"
        }
      ],
      items: [],
      item: null,
      options_startegy: []
    };
  },
  methods: {
    setCurrentRow(item, index, event) {
      this.$data.item = item;
    },
    goToStrategy(evt) {
      evt.preventDefault();
      let strategyId = this.$data.item.strategyId._id;
      for (let i in this.$data.options_startegy) {
        if (this.$data.options_startegy[i]._id == strategyId) {
          let params = { 
              strategyId: strategyId,
              from: 'history'
          }
          params.mockTrade = this.$data.item;
          this.$router.push({
            name: this.$data.options_startegy[i].url,
            params: params
          });
          return;
        }
      }
    },
    queryHistoryData() {
      let that = this;
      api
        .post("/mocktrade/history", {
          accesstoken: this.$cookies.get("accesstoken"),
          createdDate: this.$data.createdDate,
          code: this.$data.code
        })
        .then(res => {
          for (let i in res) {
            res[i]["strategy"] = res[i].strategyId.name;
            res[i]["op"] = res[i].strategyId.op == 'buy' ? '买' : '卖';
            res[i]["createDate"] = this.formatDate(
              new Date(res[i]["createDate"])
            );
          }
          that.$data.items = res;
        });
    },
    queryStrategies() {
      api.get("/strategy").then(res => {
        if (res instanceof Array) {
          this.$data.options_startegy = res;
        }
      });
    },
    formatDate(date) {
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }
  }
};
</script>
<style>
</style>


