<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增危险源分类' : '编辑危险源分类'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-form-item label="编号">
        <el-input v-model="form.diskNo" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="危险源" prop="diskName">
        <el-input v-model="form.diskName" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="描述" prop="diskDesc">
        <el-input v-model="form.diskDesc" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="诱因">
        <el-select v-model="selectIncentives" multiple filterable style="width: 100%;">
          <el-option
            v-for="item in incentivesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="风险">
        <el-select v-model="selectRisks" multiple filterable style="width: 100%;">
          <el-option
            v-for="item in risksList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-radio-group v-model="form.enable">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
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
import {
  addHazard,
  modifyHazard,
  queryHazardList,
  queryRiskLisk
} from "@/api/standard";
import { re } from "../../../../utils/config-re";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        diskNo: "",
        diskName: "",
        diskDesc: "",
        enable: 0
      },
      formRules: {
        diskName: [
          { required: true, message: "请填写危险源", trigger: "blur" }
        ],
        diskDesc: [{ required: true, message: "请填写描述", trigger: "blur" }]
      },
      entArr: [],
      incentivesList: [],
      risksList: [],
      selectIncentives: [],
      selectRisks: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.queryIncentives();
    this.queryRisks();
  },
  computed: {
    quertForm() {
      let obj = {};
      if (this.selectIncentives.length > 0) {
        obj.incentives = this.selectIncentives.join(",");
      }
      if (this.selectRisks.length > 0) {
        obj.risks = this.selectRisks.join(",");
      }
      return obj;
    }
  },
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
      addHazard(this.form, this.quertForm)
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
      modifyHazard(this.form, this.quertForm)
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
        diskNo: "",
        diskName: "",
        diskDesc: "",
        enable: 0
      };
      this.selectIncentives = [];
      this.selectRisks = [];
    },
    queryIncentives() {
      queryHazardList().then(res => {
        if (res.ok) {
          res.obj.map(item => {
            this.incentivesList.push({
              value: item.diskId,
              label: item.diskName
            });
          });
        }
      });
    },
    queryRisks() {
      queryRiskLisk().then(res => {
        if (res.ok) {
          res.obj.map(item => {
            this.risksList.push({
              value: item.riskListId,
              label: item.riskName
            });
          });
        }
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
</style>
