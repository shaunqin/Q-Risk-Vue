<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-form-item label="部门">
        <department :value="form.deptPath" @change="deptChange"></department>
      </el-form-item>
      <el-form-item label="等级">
        <el-input v-model="form.standardLevel" placeholder></el-input>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="form.color"></el-color-picker>
      </el-form-item>
      <el-form-item label="最小风险值">
        <el-input v-model="form.minRiskValue" placeholder></el-input>
      </el-form-item>
      <el-form-item label="最大风险值">
        <el-input v-model="form.maxRiskValue" placeholder></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRiskLevelStandard, modifyRiskLevelStandard } from "@/api/standard";
import department from "@/components/Department";

export default {
  components: { department },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        deptPath: null,
        standardLevel: "",
        color: "",
        minRiskValue: "",
        maxRiskValue: ""
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
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      addRiskLevelStandard(this.form)
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
      modifyRiskLevelStandard(this.form)
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
        deptPath: null,
        standardLevel: "",
        color: "",
        minRiskValue: "",
        maxRiskValue: ""
      };
    },
    deptChange(val) {
      this.form.deptPath = val;
    }
  }
};
</script>


<style lang="scss" scope>
.el-color-picker {
  .el-color-picker__trigger {
    width: 80px;
  }
}
</style>
