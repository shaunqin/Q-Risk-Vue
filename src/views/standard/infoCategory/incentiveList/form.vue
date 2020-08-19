<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row>
        <el-col :span="24">
          <el-form-item label="分类" prop="incentiveCateValue">
            <el-select
              v-model="form.incentiveCateValue"
              size="mini"
              clearable
              placeholder="请选择分类"
              style="width: 100%;"
            >
              <el-option
                v-for="item in dataList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编号" prop="no">
            <el-input v-model="form.no" placeholder="请输入编号"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
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
import { addIncentive, modifyIncentive } from "@/api/standard";
import { queryDictByName } from "@/api/dict";
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        incentiveCateValue: "",
        name: "",
        no: "",
      },
      formRules: {
        incentiveCateValue: [
          { required: true, message: "分类不能为空", trigger: "blur" },
        ],
        no: [{ required: true, message: "编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
      },
      entArr: [],
      dataList: [],
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    queryDictByName("incentive_category").then((res) => {
      res.obj[0].children.map((item) => {
        this.dataList.push({
          label: item.name,
          value: item.value,
        });
      });
    });
  },
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
          } else {
            this.doModify();
          }
        }
      });
    },
    doAdd() {
      addIncentive(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "新增成功",
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
          this.loading = false;
        });
    },
    doModify() {
      modifyIncentive(this.form)
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
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        incentiveCateValue: "",
        name: "",
        no: "",
      };
    },
  },
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
