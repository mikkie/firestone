<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand href="javascript:void(0)" v-on:click="goHome">Firestone</b-navbar-brand>
      <b-collapse
        id="nav-collapse"
        is-nav
        v-if="isLogined"
      >
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            id="history"
            href="javascript:void(0)"
            v-on:click="goHistory"
            v-if="isMock != null"
          >历史</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>用户</em>
            </template>
            <b-dropdown-item
              id="account"
              href="javascript:void(0)"
              v-on:click="goConfig"
              v-if="isMock != null"
            >账户</b-dropdown-item>
            <b-dropdown-item id="mockRealSwitch" href="javascript:void(0)" v-if="isMock == true" v-on:click="showTips('danger','暂未开放')">实盘</b-dropdown-item>
            <b-dropdown-item id="exit" href="/">退出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-alert
      :show="tip.dismissCountDown"
      dismissible
      :variant="tip.variant"
      @dismissed="tip.dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>{{ tip.message }}</p>
      <b-progress
        :variant="tip.variant"
        :max="tip.dismissSecs"
        :value="tip.dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <main>
      <router-view
        @login="updateLogin"
        @isMock="updateIsMock"
        @tips="showTips"
      ></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isLogined: false,
      isMock: null,
      tip: {
        variant: "success",
        message: "",
        dismissCountDown: 0,
        dismissSecs: 3
      }
    };
  },
  methods: {
    goHome(evt) {
      if(this.isLogined && this.isMock == true){
        this.$router.push({ path: "/homem" });
      }
    },
    updateIsMock(isMock){
      this.isMock = isMock; 
    },
    goHistory(evt) {
      evt.preventDefault();
      this.$router.push({ path: "/historym" });
    },
    goConfig(evt) {
      evt.preventDefault();
      this.$router.push({ path: "/configm" });
    },
    updateLogin(isLogined) {
      this.isLogined = isLogined;
    },
    showTips(variant, message) {
      this.tip.variant = variant;
      this.tip.message = message;
      this.tip.dismissCountDown = this.tip.dismissSecs;
    },
    countDownChanged(dismissCountDown) {
      this.tip.dismissCountDown = dismissCountDown;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

.navbar a:link {
  color: bisque;
  text-decoration: none;
}

.navbar a:hover {
  color: #ffffff;
  text-decoration: none;
}

.navbar a:visited {
  color: #ffffff;
  text-decoration: none;
}

.dropdown-menu-right {
  background-color: #2c3e50;
}

.dropdown-item:hover {
  background-color: purple;
}
</style>
