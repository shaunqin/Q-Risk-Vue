<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增数据' : '编辑数据'"
    custom-class="common_dialog"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="auto">
      <el-form-item v-if="form.parentId || isAdd" label="父级">
        <dict-select :value="form.parentId" @change="parentIdChange"></dict-select>
      </el-form-item>
      <el-form-item label="字典描述" prop="dicDesc">
        <el-input v-model="form.dicDesc" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="值" prop="dicValue">
        <el-input v-model="form.dicValue" style="width: 100%;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/dict";
import dictSelect from "@/components/DictTreeSelect";
export default {
  components: { dictSelect },
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
        dicDesc: "",
        dicValue: "",
        parentId: null,
      },
      rules: {
        dicDesc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        dicValue: [{ required: true, message: "值不能为空", trigger: "blur" }],
      },
      entArr: [],
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
        dicCode: "",
        dicDesc: "",
        dicValue: "",
        parentId: null,
      };
    },
    parentIdChange(val) {
      this.form.parentId = val;
    },
  },
};
</script>

<style lang="scss">
.el-select-dropdown {
  z-index: 9999999999999999 !important;
}
</style>
