<template>
  <div class="configm">
    <h5>交易设置</h5>
    <b-container>
      <b-form @submit="validate">
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
            <label for="valid-key">key:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-input
              id="valid-key"
              required
              v-model="config.validatekey"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="6"
            class="label"
          >
            <label for="gddm">gddm:</label>
          </b-col>
          <b-col
            lg="2"
            class="input"
          >
            <b-form-input
              id="gddm"
              required
              v-model="config.gddm"
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
  name: "config",
  data() {
    return {
      config: {}
    };
  },
  created: function() {
    this.$emit("login", true);
    this.$emit("isMock", false);
    this.get_config();
  },
  methods: {
    validate(evt){
      evt.preventDefault();
      let that = this;
      api.post("/firestonerock/pingdfcfheartbeat", {
        cookie : this.$data.config.cookie,
        validatekey: this.$data.config.validatekey
      }).then(r => {
        if(r && r.Status == 0){
          that.onSubmit();
        }
        else{
          that.$emit("tips", "danger", "校验失败，请检查cookie, validatekey配置");
        }
      });
    },
    onSubmit() {
      let that = this;
      api
        .post("/config", {
          accesstoken: this.$cookies.get("accesstoken"),
          update: {
            maxBuyNum: this.$data.config.maxBuyNum,
            cookie: this.$data.config.cookie,
            validatekey: this.$data.config.validatekey,
            gddm: this.$data.config.gddm
          }
        })
        .then(r => {
          if (r && r.maxBuyNum == that.$data.config.maxBuyNum) {
            that.$router.push({ path: "/home" });
          }
        });
    },
    get_config() {
      api.get("/config/" + this.$cookies.get("accesstoken")).then(res => {
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



