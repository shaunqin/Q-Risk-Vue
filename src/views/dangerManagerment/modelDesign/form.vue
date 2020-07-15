<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增计算公式' : '编辑计算公式'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="编号">
            <el-input v-model="form.formulaNo" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称">
            <el-input v-model="form.name" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公式说明">
            <el-input type="textarea" :rows="6" readonly :value="designDesc" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="公式" prop="formula">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.formula"
              style="width: 100%;"
              placeholder="z=(m+n)*(m-n)/s"
            />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-radio-group v-model="form.enable">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
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
import { addModel, modifyModel } from "@/api/risk";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        formulaNo: "",
        name: "",
        remark: "",
        formula: "",
        enable: ""
      },
      roleSelect: [],
      formRules: {
        formula: [{ required: true, message: "请填写公式", trigger: "blur" }]
      },
      entArr: [],
      designDesc: `各公式含义:
m:危险源关联事件次数(根据时间统计);
n:危险源关联安全信息次数(根据时间统计);
a:危险源关联的次数;
s:严重性量化分值(查询);
z:风险值(最终计算值)`
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
      addModel(this.form)
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
      modifyModel(this.form)
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
        formulaNo: "",
        name: "",
        remark: "",
        formula: "",
        enable: ""
      };
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
</style>
