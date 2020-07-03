<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row>
        <el-col :span="24">
          <el-form-item label="产品" prop="aa">
            <el-select v-model="form.aa" placeholder="请选择产品" style="width: 100%;">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质量评价表" prop="bb">
            <el-select v-model="form.bb" placeholder style="width: 100%;">
              <el-option
                v-for="item in pList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="评价表字段">
            <el-table :data="data" size="mini">
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.aa" placeholder=""></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注">
                 <template slot-scope="scope">
                  <el-input v-model="scope.row.bb" placeholder=""></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.cc" placeholder type="textarea" rows="3"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/emplotee.js";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        aa: "",
        bb: "",
        cc: "",
        dd: "",
        ee: ""
      },
      roleSelect: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      entArr: [],
      option: [
        { label: "定检产品", value: "1" },
        { label: "发动机APU产品", value: "2" },
        { label: "附件产品", value: "3" },
        { label: "航线产品", value: "4" }
      ],
      qList: [],
      totalList: [
        { label: "出厂检发现问题万时率", value: "1", pid: "1" },
        { label: "定检出厂首班机械原因不正常万时率", value: "2", pid: "1" },
        { label: "定检出场一周机械原因不正常万时率", value: "3", pid: "1" },
        { label: "客户满意度调查平均值", value: "4", pid: "1" },
        { label: "客户质量投诉", value: "5", pid: "1" },
        { label: "质量事件调查万时率", value: "6", pid: "1" },
        { label: "发动机APU基础数据", value: "7", pid: "2" },
        { label: "产品质量评价体系分项指标", value: "8", pid: "3" },
        { label: "附件产品质量评价数据2020优化版", value: "9", pid: "3" },
        { label: "航线不正常千次率", value: "10", pid: "4" },
        { label: "航线机组报告率", value: "11", pid: "4" },
        { label: "客户质量投诉万分率", value: "12", pid: "4" },
        { label: "质量事件调查万次率", value: "13", pid: "4" },
        { label: "重复故障率", value: "14", pid: "4" }
      ],
      data: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {},
  watch: {
    "form.aa": {
      handler(val) {
        if (val) {
          this.form.bb = "";
          this.pList = this.totalList.filter(r => r.pid == val);
        }
      }
    },
    "form.bb": {
      handler(val) {
        let label = this.pList.find(r => r.value == val).label;
          this.data=[];
        for (let i = 0; i < 3; i++) {
          this.data.push({
            aa: label + " - 字段" + i,
            bb: "备注" + i
          });
        }
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // this.loading = true;
          // if (this.isAdd) {
          //   this.doAdd()
          // } else this.doModify()

          this.dialog = false;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        }
      });
    },
    doAdd() {
      // this.delwithRoleList()
      const data = this.roleSelect;
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          id: ""
        };
        obj.id = data[i];
        arr.push(obj);
      }
      this.form.roleList = arr;
      add(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message.error(res.msg);
          }
          this.resetForm();
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    doModify() {
      modify(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message.error(res.msg);
          }
          this.resetForm();
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        aa: "",
        bb: "",
        cc: "",
        dd: "",
        ee: ""
      };
      this.roleSelect = [];
    },
    roleChange(e) {
      if (e.length <= 1) {
        this.form.roleList = e[0];
      }
      let arr = [];
      for (let i = 0; i < e.length; i++) {
        let obj = {
          id: ""
        };
        obj.id = e[i];
        arr.push(obj);
      }
      this.form.roleList = arr;
    },
    roleRemove(e) {}
    // delwithRoleList() {
    //   const roleList = this.roleList
    //   const checkList = this.form.roleList
    //   let newList = []
    //   let obj = {}
    //   for (let i = 0; i < checkList.length; i++) {
    //     for (let j = 0; j < roleList.length; j++) {
    //       if (checkList[i] === roleList[j].id) {
    //         obj.id = Number(checkList[i])
    //         obj.code = roleList[j].code
    //         obj.roleDesc = roleList[j].roleDesc
    //         // obj.sn = roleList[j].sn
    //         newList.push(obj)
    //         obj = {}
    //       }
    //     }
    //   }
    //   this.form.roleList = newList
    // }
  }
};
</script>

<style scoped>
</style>

<style lang="scss">
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
