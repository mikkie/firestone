<template>
  <div class="homem">
    <h5>模拟交易</h5>
    <b-container>
      <div>
        <b-form
          inline
          class="toobar"
        >
          <b-form-checkbox
            class="mb-2 mr-sm-2 mb-sm-0"
            v-on:input="check_all($event)"
          ></b-form-checkbox>
          <b-button
            id="new_item"
            variant="success"
            size="md"
            v-b-modal.modal
          >新建</b-button>
          <b-button
            id="del_item"
            variant="danger"
            size="md"
            v-on:click="openDelConfirm"
          >删除</b-button>
          <b-button
            id="boot_item"
            variant="warning"
            size="md"
            v-on:click="bootItem"
          >启动</b-button>
          <b-button
            id="stop_item"
            variant="info"
            size="md"
            v-on:click="stopItem"
          >停止</b-button>
        </b-form>
      </div>
      <div>
        <b-table
          striped
          hover
          :fields="fields"
          :items="items"
        >
          <template v-slot:cell(checked)="data">
            <b-form-checkbox
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="data.value"
              v-on:input="check_line($event,data)"
            ></b-form-checkbox>
          </template>
          <template v-slot:cell(strategy)="data">
            <b-link
              href="javascript:void(0)"
              v-on:click="goBasic"
            >{{ data.value }}</b-link>
          </template>
        </b-table>
      </div>
    </b-container>
    <b-modal
      id="modal"
      title="选择策略"
      @ok="goBasic"
    >
      <b-form inline>
        <b-form-select
          v-model="selected_bs"
          :options="options_bs"
        ></b-form-select>
        <b-form-select
          v-model="selected_startegy"
          :options="options_startegy"
        ></b-form-select>
      </b-form>
      <template v-slot:modal-ok="ok">
        确定
      </template>
      <template v-slot:modal-cancel="cancel">
        取消
      </template>
    </b-modal>
    <b-modal
      id="del_item_modal"
      ref="modal1"
      title="删除策略"
      @ok="deleteItem"
    >
      <p>确定删除策略?</p>
      <template v-slot:modal-ok="ok">
        确定
      </template>
      <template v-slot:modal-cancel="cancel">
        取消
      </template>
    </b-modal>
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "home_m",
  data() {
    return {
      fields: [
        {
          key: "checked",
          label: "选中"
        },
        {
          key: "code",
          label: "代码"
        },
        {
          key: "strategy",
          label: "策略"
        },
        {
          key: "state",
          label: "状态"
        },
        {
          key: "result",
          label: "交易结果"
        }
      ],
      items: [],
      selected_bs: "buy",
      options_bs: [{ value: "buy", text: "买" }, { value: "sell", text: "卖" }],
      selected_startegy: null,
      options_startegy: []
    };
  },
  created: function() {
    this.$emit("login", true);
    this.$emit("isMock", true);
    let that = this;
    api.get(`/mocktrade/${this.$cookies.get("accesstoken")}`).then(res => {
      for (let i in res) {
        res[i]["checked"] = false;
        res[i]["strategy"] = "基础策略";
      }
      that.$data.items = res;
    });
    api.get("/strategy").then(res => {
      if (res instanceof Array) {
        for (let i in res) {
          (res[i]["value"] = res[i]._id), (res[i]["text"] = res[i].name);
          if (i == 0) {
            this.$data.selected_startegy = res[i]._id;
          }
        }
        this.$data.options_startegy = res;
      }
    });
  },
  methods: {
    goBasic() {
      let strategyId = this.$data.selected_startegy;
      for (let i in this.$data.options_startegy) {
        if (this.$data.options_startegy[i]._id == strategyId) {
          this.$router.push({ name: this.$data.options_startegy[i].url, params: {strategyId : strategyId} });
          return;
        }
      }
    },
    check_all(evt) {
      for (let i in this.items) {
        this.items[i].checked = evt;
      }
    },
    check_line(evt, data) {
      data.item.checked = evt;
    },
    check_selected() {
      for (let i in this.items) {
        if (this.items[i].checked == true) {
          return true;
        }
      }
      this.$emit("tips", "danger", "请勾选要操作的行");
      return false;
    },
    openDelConfirm(evt) {
      if (this.check_selected()) {
        this.$refs["modal1"].show();
      }
    },
    deleteItem(evt) {
      for (let i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].checked == true) {
          api
            .post("/mocktrade", {
              accesstoken: this.$cookies.get("accesstoken"),
              mocktradeid: this.items[i]._id,
              update: {
                deleted: true
              }
            })
            .then(r => {
              if (r.deleted == true) {
                this.items.splice(i, 1);
              }
            });
        }
      }
    },
    bootItem(evt) {
      if (this.check_selected()) {
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            api
              .post("/mocktrade", {
                accesstoken: this.$cookies.get("accesstoken"),
                mocktradeid: this.items[i]._id,
                update: {
                  state: "运行中"
                }
              })
              .then(r => {
                if (r.state == "运行中") {
                  this.items[i].state = r.state;
                }
              });
          }
        }
      }
    },
    stopItem(evt) {
      if (this.check_selected()) {
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            api
              .post("/mocktrade", {
                accesstoken: this.$cookies.get("accesstoken"),
                mocktradeid: this.items[i]._id,
                update: {
                  state: "停止"
                }
              })
              .then(r => {
                if (r.state == "停止") {
                  this.items[i].state = r.state;
                }
              });
          }
        }
      }
    }
  }
};
</script>
<style>
.toobar button {
  margin: 3px;
}
</style>


