<template>
  <div class="mainmenu">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col lg="3">
          <b-card
            title="模拟"
            img-src="https://picsum.photos/600/300/?image=1015"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>同花顺模拟账号进行交易.</b-card-text>
            <div>
              <b-button
                href="#"
                variant="primary"
                v-on:click="start"
              >进入</b-button>
            </div>
          </b-card>
        </b-col>
        <b-col lg="3">
          <b-card
            title="实盘"
            img-src="https://picsum.photos/600/300/?image=1022"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>实盘交易(暂不开放).</b-card-text>
            <div>
              <b-button
                href="#"
                variant="primary"
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
  methods: {
    start(evt) {
      this.$router.push({ path:'/menu' })
    }
  }
};
</script>

<style>
b-card-text{
  text-align: left;
}
</style>
