<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增风险清单' : '编辑风险清单'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row>
        <el-col :span="24">
          <el-form-item label="编号" prop="riskNo">
            <el-input v-model="form.riskNo" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="名称" prop="riskName">
            <el-input v-model="form.riskName" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.riskDesc" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="等级描述">
            <el-select v-model="form.levels" placeholder>
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用">
            <el-radio-group v-model="form.enable">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="关键风险">
            <el-radio-group v-model="form.isKey">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
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
import { addRisk, modifyRisk } from "@/api/standard";
import { queryDictByName } from "@/api/dict";
import { re } from "../../../../utils/config-re";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        riskNo: "",
        riskName: "",
        riskDesc: "",
        levels: 0,
        enable: 0,
        isKey: 0,
      },
      roleSelect: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
      entArr: [],
      levelList: [],
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.getLevelList();
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
          } else this.doModify();
        }
      });
    },
    doAdd() {
      addRisk(this.form)
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
          this.loading = false;
        });
    },
    doModify() {
      modifyRisk(this.form)
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
        riskNo: "",
        riskName: "",
        riskDesc: "",
        levels: 0,
        enable: 0,
        isKey: 0,
      };
      this.roleSelect = [];
    },
    getLevelList() {
      queryDictByName("severity_level").then((res) => {
        res.obj[0].children.map((item) => {
          this.levelList.push({
            label: item.name,
            value: Number(item.value),
          });
        });
      });
    },
  },
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
