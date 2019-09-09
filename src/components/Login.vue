<template>
  <div class="login">
    <h2>{{ msg }}</h2>
    <b-container>
      <b-form @submit="onSubmit">
        <b-form-row class="justify-content-md-center">
          <b-col lg="3">
            <b-form-input
              placeholder="用户名"
              type="text"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="justify-content-md-center">
          <b-col lg="3">
            <b-form-input
              placeholder="密码"
              type="password"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="justify-content-md-center">
          <b-col>
            <b-button
              type="submit"
              variant="primary"
            >登录</b-button>
          </b-col>
        </b-form-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      msg: "Firestone"
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.$router.push({ path:'/menu' })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

a {
  color: #35495e;
}

.login {
  margin-top: 100px;
}

.form-row {
  margin: 6px;
}
</style>
