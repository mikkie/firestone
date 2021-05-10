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
      this.onSubmit();
    },
    onSubmit() {
      let that = this;
      api
        .post("/config", {
          accesstoken: this.$cookies.get("accesstoken"),
          update: {
            maxBuyNum: this.$data.config.maxBuyNum
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



