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
        <department :value="form.deptPath" @change="deptChange" />
      </el-form-item>
      <el-form-item label="界定标准" prop="standard">
        <el-input v-model="form.standard" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="风险等级">
        <el-input-number v-model="form.riskLevel" />
      </el-form-item>
      <el-form-item label="量化分值">
        <el-input-number v-model="form.score" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.enable">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRiskLevel, modifyRiskLevel } from "@/api/standard";
import department from "@/components/Department";

export default {
  components: {
    department
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        deptPath: null,
        standard: "",
        riskLevel: 0,
        score: 0,
        enable: "",
        type: "2"
      },
      roleSelect: [],
      formRules: {
        standard: [
          { required: true, message: "请填写界定标准", trigger: "blur" }
        ]
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
      addRiskLevel(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    doModify() {
      modifyRiskLevel(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
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
        standard: "",
        riskLevel: 0,
        score: 0,
        enable: "",
        type: "2"
      };
    },
    deptChange(val) {
      this.form.deptPath = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
