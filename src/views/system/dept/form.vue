<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增功能' : '编辑功能'"
    custom-class="common_dialog"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="auto">
      <el-form-item label="父级" prop="parentCode">
        <department :value="form.parentCode" @change="deptChange" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="名称(中文)" prop="departmentNameCn">
        <el-input v-model="form.departmentNameCn" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="名称(英文)" prop="departmentNameEn">
        <el-input v-model="form.departmentNameEn" style="width: 100%;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/dept";
import department from "@/components/Department";
export default {
  components: { department },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        departmentNameCn: "",
        departmentNameEn: "",
        parentCode: null,
      },
      rules: {
        departmentNameCn: [
          { required: true, message: "名称不能为空", trigger: "blur" },
        ],
        departmentNameEn: [
          { required: true, message: "英文名称不能为空", trigger: "blur" },
        ],
        parentCode: [
          { required: true, message: "父级不能为空", trigger: "blur" },
        ],
      },
      entArr: [],
      disabled: true,
    };
  },
  created() {},
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      add(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    doModify() {
      modify(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        departmentNameCn: "",
        departmentNameEn: "",
        parentCode: null,
      };
      this.disabled = true;
    },
    deptChange(val) {
      console.log(val);
      this.form.parentCode = val;
    },
  },
};
</script>

<style scoped>
</style>
