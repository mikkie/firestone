<template>
  <div class="configm">
    <h5>模拟交易设置</h5>
    <b-container>
      <b-form @submit="validate">
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="available_amount">账户信息:</label>
          </b-col>
          <b-col
            lg="6"
            class="input"
          >
            <b-link
              :href="config.ths_url"
              target="_blank"
            >查看</b-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="max_buy_amount">当日最大买入数:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-input-group
              size="sm"
              append="只"
            >
              <b-form-input
                id="buy_count"
                required
                v-model="config.maxBuyNum"
              ></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="username">用户名:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-input
              id="username"
              required
              v-model="config.username"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="gdzh">账号:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-input
              id="gdzh"
              required
              v-model="config.gdzh"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="gdzh-sh">账号(上海):</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-input
              id="gdzh-sh"
              required
              v-model="config.sh_gdzh"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="cookie">Cookie:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-textarea
              id="cookie"
              required
              v-model="config.cookie"
              placeholder="cookie值"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <b-button
              id="available_amount"
              type="submit"
              variant="primary"
            >保存</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "config_m",
  data() {
    return {
      config: {}
    };
  },
  created: function() {
    this.$emit("login", true);
    this.$emit("isMock", true);
    this.get_config();
  },
  methods: {
    validate(evt){
      evt.preventDefault();
      let that = this;
      api.post("/firestonerock/pingheartbeat", {
        cookie : this.$data.config.cookie
      }).then(r => {
        if(r && r.errorcode == 0){
          that.onSubmit();
        }
        else{
          that.$emit("tips", "danger", "校验失败，请检查cookie配置");
        }
      });
    },
    onSubmit() {
      let that = this;
      api
        .post("/configmock", {
          accesstoken: this.$cookies.get("accesstoken"),
          update: {
            maxBuyNum: this.$data.config.maxBuyNum,
            cookie: this.$data.config.cookie,
            gdzh: this.$data.config.gdzh,
            sh_gdzh: this.$data.config.sh_gdzh,
            username: this.$data.config.username
          }
        })
        .then(r => {
          if (r && r.maxBuyNum == that.$data.config.maxBuyNum) {
            that.$router.push({ path: "/homem" });
          }
        });
    },
    get_config() {
      api.get("/configmock/" + this.$cookies.get("accesstoken")).then(res => {
        if (res) {
          this.$data.config = res;
        }
      });
    }
  }
};
</script>
<style>
.label {
  text-align: right;
}
.input {
  text-align: left;
}
.row {
  margin-top: 10px;
}
</style>



