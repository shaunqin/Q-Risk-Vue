<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="填报"
    custom-class="big_dialog"
  >
    <el-button type="primary" size="mini" @click="addTable" style="margin-bottom:10px">新增一行</el-button>
    <el-button type="warning" size="mini" style="margin-bottom:10px">上传附件</el-button>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;" height="50vh">
      <el-table-column type="index" width="50" />
      <el-table-column prop="aa" label="危险源" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.aa" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="bb" label="问题描述" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.bb" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cc" label="ID" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cc" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="dd" label="可能性" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.dd" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ee" label="严重性" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ee" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ff" label="可能导致的风险" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ff" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="gg" label="风险等级" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.gg" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="hh" label="根原因分析" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.hh" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ii" label="控制措施" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ii" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="jj" label="责任单位" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.jj" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="kk" label="控制状态" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.kk" placeholder></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ll" label="完成期限" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ll" placeholder></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import initData from "@/mixins/initData";
import { add, modify } from "@/api/emplotee.js";

export default {
  mixins: [initData],
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
      entArr: []
    };
  },
  props: {},
  created() {},
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.dialog = false;
      this.$message({
        message: "填报成功",
        type: "success"
      });
      this.resetForm();
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
      this.data = [];
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
    addTable() {
      this.data.push({
        aa: "",
        bb: "",
        cc: "",
        dd: "",
        ee: "",
        ff: "",
        gg: "",
        hh: "",
        ii: "",
        jj: "",
        kk: "",
        ll: ""
      });
    }
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
.big_dialog {
  width: 1100px;
}
</style>
