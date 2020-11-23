<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '发布任务' : '修改任务'"
    custom-class="big_dialog"
    top="5vh"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="负责部门" prop="aa">
            <el-select v-model="form.aa" style="width: 100%;">
              <el-option label="空客_5中队" value="空客_5中队" />
              <el-option label="成都分公司" value="成都分公司" />
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="bb">
            <el-input v-model="form.bb" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="任务内容">
            <el-input type="textarea" :rows="2" v-model="form.cc" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="单据类型">
            <el-radio-group v-model="form.dd">
              <el-radio :label="1">检查任务包含检查单</el-radio>
              <el-radio :label="0">无检查单</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="检查单">
            <el-select v-model="form.ee" style="width: 100%;">
              <el-option label="2019周检查单" value="2019周检查单" />
              <el-option label="检查程序文件" value="检查程序文件" />
            </el-select>
            <a>预览</a>
          </el-form-item>
          <el-form-item label="适用产品类型">
            <el-radio-group v-model="form.ff">
              <el-radio :label="1">航线</el-radio>
              <el-radio :label="2">定检/大修</el-radio>
              <el-radio :label="3">发动机/APU</el-radio>
              <el-radio :label="4">附件修理</el-radio>
              <el-radio :label="5">组织管理</el-radio>
              <el-radio :label="6">检测中心</el-radio>
              <el-radio :label="7">生产支援部</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-radio-group v-model="form.gg">
              <el-radio :label="1">安全监察</el-radio>
              <el-radio :label="2">质量监督</el-radio>
              <el-radio :label="3">三级监察</el-radio>
              <el-radio :label="4">专项检查</el-radio>
              <el-radio :label="5">巡检</el-radio>
              <el-radio :label="6">其他</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="周期">
            <el-select v-model="form.hh" style="width: 100%;" placeholder="请选择反馈周期">
              <el-option label="请选择反馈周期" value />
              <el-option label="一天" value="一天" />
              <el-option label="一周" value="一周" />
              <el-option label="一月" value="一月" />
              <el-option label="三月" value="三月" />
              <el-option label="一年" value="一年" />
            </el-select>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-date-picker v-model="form.ii" type="date" placeholder="请选择开始日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期">
            <el-date-picker v-model="form.jj" type="date" placeholder="请选择截止日期"></el-date-picker>
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
        ee: "",
        ii: "",
        jj: ""
      },
      roleSelect: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      entArr: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {},
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
        ee: "",
        ii: "",
        jj: ""
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
  }
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1000px;
}
</style>

