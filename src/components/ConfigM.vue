<template>
  <div class="configm">
    <h5>模拟交易设置</h5>
    <b-container>
    <b-form @submit="onSubmit">
      <b-row>
        <b-col lg="6" class="label">
          <label for="available_amount">账户信息:</label>
        </b-col>
        <b-col lg="6" class="input">
          <b-link href="#foo">查看</b-link>
        </b-col>
      </b-row>
      <b-row>  
        <b-col lg="6" class="label">
          <label for="max_buy_amount">当日最大买入数:</label>
        </b-col>
        <b-col lg="2" class="input">
          <b-input-group size="sm" append="只">
            <b-form-input required></b-form-input>
          </b-input-group>
        </b-col> 
      </b-row>
      <b-row>  
        <b-col lg="12">
          <b-button id="available_amount" type="submit"  variant="primary">保存</b-button>
        </b-col> 
      </b-row>
    </b-form>  
    </b-container>  
  </div>      
</template>
<script>
export default {
    name: "config_m",
    data() {
      return {
      };
    },
    created: function () {
      this.$emit("login", true);
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.$router.push({ path:'/homem' })
      }
    }
}
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



