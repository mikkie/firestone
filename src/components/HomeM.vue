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
            v-on:click="openDelConfirm('modal1')"
          >删除</b-button>
          <b-button
            id="boot_item"
            variant="warning"
            size="md"
            v-on:click="bootItem"
          >启动</b-button>
          <b-button
            id="pause_item"
            variant="info"
            size="md"
            v-on:click="pauseItem"
          >暂停</b-button>
          <b-button
            id="cancel_item"
            variant="secondary"
            size="md"
            v-on:click="cancelItem"
          >撤销</b-button>
          <b-button
            id="stop_item"
            variant="dark"
            size="md"
            v-on:click="openDelConfirm('modal2')"
          >停止</b-button>
          <b-button
            id="refresh_item"
            variant="primary"
            size="md"
            v-on:click="refreshItem"
          >刷新</b-button>
        </b-form>
      </div>
      <div>
        <b-table
          striped
          hover
          :fields="fields"
          :items="items"
          @row-hovered="setCurrentRow"
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
              v-on:click="goToStrategy(false)"
            >{{ data.value }}</b-link>
          </template>
          <template v-slot:cell(state)="data">
            <span style="font-weight:bold">{{ data.value }}</span>
          </template>
        </b-table>
      </div>
    </b-container>
    <b-modal
      id="modal"
      title="选择策略"
      @ok="goToStrategy(true)"
    >
      <b-form inline>
        <b-form-select
          v-model="selected_bs"
          :options="options_bs"
        ></b-form-select>
        <b-form-select
          id="select_strategy"
          v-model="selected_startegy"
          :options="related_strategies"
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
    <b-modal
      id="stop_item_modal"
      ref="modal2"
      title="停止策略"
      @ok="stopItem"
    >
      <p>确定停止策略?</p>
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
import { setInterval } from 'timers';
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
          key: "op",
          label: "操作"
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
      item: null,
      inter: null,
      items: [],
      selected_bs: "buy",
      options_bs: [{ value: "buy", text: "买" }, { value: "sell", text: "卖" }, {value: 'select', text: '选'}],
      selected_startegy: null,
      related_strategies: [],
      options_startegy: []
    };
  },
  beforeDestroy: function(){
    if(this.$data.inter != null){
      window.clearInterval(this.$data.inter);
    }
  },
  created: function() {
    this.$emit("login", true);
    this.$emit("isMock", true);
    this.findMockTrades();
    this.$data.inter = window.setInterval(this.findMockTrades,30000);
    api.get("/strategy").then(res => {
      if (res instanceof Array) {
        for (let i in res) {
          (res[i]["value"] = res[i]._id), (res[i]["text"] = res[i].name);
          if (res[i]["op"] == "buy") {
            this.$data.related_strategies.push(res[i]);
          }
        }
        this.$data.options_startegy = res;
        this.$data.selected_startegy = this.$data.related_strategies[0]._id;
      }
    });
  },
  watch: {
    selected_bs: function(newOp, oldOp) {
      let startegies = [];
      for (let i in this.$data.options_startegy) {
        if (this.$data.options_startegy[i].op == newOp) {
          startegies.push(this.$data.options_startegy[i]);
        }
      }
      this.$data.related_strategies = startegies;
      this.$data.selected_startegy = startegies[0]._id;
    }
  },
  methods: {
    findMockTrades() {
      let that = this;
      api.get(`/mocktrade/${this.$cookies.get("accesstoken")}`).then(res => {
        for (let i in res) {
          if(i >= that.$data.items.length || that.$data.items[i].checked == undefined){
            res[i]["checked"] = false;
          }
          else{
            res[i]["checked"] = that.$data.items[i].checked;
          }
          res[i]["strategy"] = res[i].strategyId.name;
          res[i]["op"] = res[i].strategyId.op == 'buy' ? '买' : res[i].strategyId.op == 'sell' ? '卖' : '选';
        }
        that.$data.items = res;
      });
    },
    setCurrentRow(item, index, event) {
      this.$data.item = item;
    },
    goToStrategy(is_new) {
      let strategyId = this.$data.selected_startegy;
      if (!is_new) {
        strategyId = this.$data.item.strategyId._id;
      }
      for (let i in this.$data.options_startegy) {
        if (this.$data.options_startegy[i]._id == strategyId) {
          let params = {
            strategyId: strategyId
          };
          if (!is_new) {
            params.mockTrade = this.$data.item;
          }
          let urlName = this.$data.options_startegy[i].url;
          if (urlName == null || urlName.length == 0) {
            this.$emit("tips", "danger", "该策略暂未开放");
            return;
          }
          this.$router.push({
            name: urlName,
            params: params
          });
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
    openDelConfirm(model) {
      if (this.check_selected()) {
        this.$refs[model].show();
      }
    },
    deleteItem(evt) {
      for (let i = this.items.length - 1; i >= 0; i--) {
        let popupTip = false;
        if (this.items[i].checked == true) {
          if (["未开始", "已完成"].indexOf(this.items[i].state) >= 0) {
            let that = this;
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
                  that.items.splice(i, 1);
                }
              });
          } else {
            this.$emit("tips", "danger", "状态为[未开始][已完成]才可以删除");
          }
        }
      }
    },
    refreshItem(evt) {
      this.findMockTrades()
    },
    startFireStoneRock(code, tradeId) {
      let codes = [code];
      let that = this;
      if (code.startsWith("3")) {
        codes.push("399006");
      } else {
        codes.push("000001");
      }
      api
        .post("/firestonerock", {
          accesstoken: this.$cookies.get("accesstoken"),
          codes: codes,
          tradeId: tradeId
        })
        .then(r => {
          if (r.error != null) {
            that.$emit("tips", "danger", `[${code}]启动失败`);
          }
        });
    },
    bootItem(evt) {
      if (this.check_selected()) {
        let popupTip = false;
        let now = new Date()
        let todayStr = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`;
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            if (["已提交", "撤销", "已完成"].indexOf(this.items[i].state) < 0 && this.items[i].params.executeDate == todayStr) {
              let that = this;
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
                    let oldState = that.items[i].state;
                    that.items[i].state = r.state;
                    if (oldState == "未开始") {
                      that.startFireStoneRock(
                        this.items[i].params["code"],
                        this.items[i]._id
                      );
                    }
                  }
                });
            } else {
              this.$emit(
                "tips",
                "danger",
                "状态为[已提交],[撤销],[已完成]及执行日期未到，不可以启动, "
              );
            }
          }
        }
      }
    },
    pauseItem(evt) {
      if (this.check_selected()) {
        let popupTip = false;
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            if (
              ["未开始", "已提交", "已完成"].indexOf(this.items[i].state) < 0
            ) {
              let that = this;
              api
                .post("/mocktrade", {
                  accesstoken: this.$cookies.get("accesstoken"),
                  mocktradeid: this.items[i]._id,
                  update: {
                    state: "暂停"
                  }
                })
                .then(r => {
                  if (r.state == "暂停") {
                    that.items[i].state = r.state;
                  }
                });
            } else {
              this.$emit(
                "tips",
                "danger",
                "状态为[未开始],[已提交],[已完成]不可以暂停"
              );
            }
          }
        }
      }
    },
    cancelItem(evt) {
      if (this.check_selected()) {
        let popupTip = false;
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            if (this.items[i].state == "已提交") {
              let that = this;
              api
                .post("/mocktrade", {
                  accesstoken: this.$cookies.get("accesstoken"),
                  mocktradeid: this.items[i]._id,
                  update: {
                    state: "撤销"
                  }
                })
                .then(r => {
                  if (r.state == "撤销") {
                    that.items[i].state = r.state;
                  }
                });
            } else {
              popupTip = true;
            }
          }
        }
        if (popupTip) {
          this.$emit("tips", "danger", "状态为[已提交]才可以撤销");
        }
      }
    },
    stopItem(evt) {
      if (this.check_selected()) {
        let popupTip = false;
        for (let i in this.items) {
          if (this.items[i].checked == true) {
            if (["未开始", "已提交", "撤销"].indexOf(this.items[i].state) < 0) {
              let that = this;
              api
                .post("/mocktrade", {
                  accesstoken: this.$cookies.get("accesstoken"),
                  mocktradeid: this.items[i]._id,
                  update: {
                    state: "已完成"
                  }
                })
                .then(r => {
                  if (r.state == "已完成") {
                    that.items[i].state = r.state;
                  }
                });
            } else {
              popupTip = true;
            }
          }
        }
        if (popupTip) {
          this.$emit(
            "tips",
            "danger",
            "状态为[未开始],[已提交],[撤销]不可以停止"
          );
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


