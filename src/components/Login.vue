<template>
  <div class="login">
    <h2>{{ msg }}</h2>
    <b-container>
      <b-form @submit="onSubmit">
        <b-form-row class="justify-content-md-center">
          <b-col lg="3">
            <b-form-input
              id="username"
              placeholder="用户名"
              type="text"
              required
              v-model.trim="user.username"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="justify-content-md-center">
          <b-col lg="3">
            <b-form-input
              id="password"
              placeholder="密码"
              type="password"
              required
              v-model.trim="user.password"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="justify-content-md-center">
          <b-col>
            <b-button
              id="login"
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
import api from "@/api";
export default {
  name: "login",
  data() {
    return {
      msg: "Firestone",
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    created: function() {
      this.$emit("login", false);
    },
    onSubmit(evt) {
      evt.preventDefault();
      var that = this; 
      api.post("/users/login", this.user).then((res) => {
        if (res.access_token) {
          that.$cookies.set("accesstoken", res.access_token)
          that.$router.push({ path: "/menu" });
        }
        else {
          that.$emit("tips","danger","用户名或密码错误");
        }
      });
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
