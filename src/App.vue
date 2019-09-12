<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Firestone</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav v-if="isLogined">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="void(0)" v-on:click="goHistory">历史</b-nav-item> 
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>用户</em>
          </template>
          <b-dropdown-item href="void(0)" v-on:click="goConfig">账户</b-dropdown-item>
          <b-dropdown-item href="/">实盘</b-dropdown-item>
          <b-dropdown-item href="/">退出</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    </b-navbar>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isLogined: false
    };
  },
  methods: {
    goHistory(evt) {
      evt.preventDefault()
      this.$router.push({ path:'/historym' })
    },
    goConfig(evt) {
      evt.preventDefault()
      this.$router.push({ path:'/configm' })
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
