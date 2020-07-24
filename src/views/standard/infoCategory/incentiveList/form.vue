<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类别" prop="cateValue">
            <el-select
              v-model="form.cateValue"
              size="mini"
              clearable
              placeholder="请选择类别"
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
import { modifyIncentive } from "@/api/standard";
import { queryDictByName } from "@/api/dict";
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        cateValue: "",
      },
      formRules: {
        cateValue: [{ required: true, message: "请选择类别", trigger: "blur" }],
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
          this.doModify();
        }
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
        cateValue: "",
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
