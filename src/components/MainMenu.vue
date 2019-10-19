<template>
  <div class="mainmenu">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col lg="3">
          <b-card
            title="模拟"
            img-src="../assets/sim.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <div class="desc">同花顺模拟账号进行交易.</div>
            <div>
              <b-button
                id="mock_btn"
                variant="primary"
                v-on:click="startMock()"
              >进入</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col lg="3">
          <b-card
            title="实盘"
            img-src="../assets/real.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <div class="desc">实盘交易(暂不开放).</div>
            <div>
              <b-button
                variant="danger"
                v-on:click="startReal()"
              >进入</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "mainmenu",
  created: function () {
    this.$emit("login", true);
  },
  methods: {
    startMock() {
      this.$router.push({ path:'/configm' })
    },
    startReal(){
      this.$emit("tips", "danger", "暂未开放");
    }
  }
};
</script>

<style>
b-card-text{
  text-align: left;
}
</style>
