<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-form-item label="关键指标分值标准" prop="standard">
        <el-input v-model="form.standard" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="年度" prop="year">
        <el-date-picker
          v-model="form.year"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
          style="width: 260px">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="产品">
          <el-select
            v-model="form.productValue"
            placeholder
            style="width: 260px"
          >
            <el-option
              v-for="item in prodList"
              :key="item.key"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="是否国航" v-if="showType">
          <el-select
            v-model="form.type"
            placeholder
            style="width: 260px"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="部门" v-if="!showType">
        <department :value="form.deptPath" @change="deptChange" style="width: 260px" />
      </el-form-item>
      <el-form-item label="目标值">
        <el-input-number v-model="form.evaluationLevel" style="width: 260px" />
      </el-form-item>
      <el-form-item label="量化分值">
        <el-input-number v-model="form.score" style="width: 260px" />
      </el-form-item>
      <el-form-item label="最小指标值">
        <el-input-number v-model="form.minIndexValue" style="width: 260px" />
      </el-form-item>
      <el-form-item label="最大指标值">
        <el-input-number v-model="form.maxIndexValue" style="width: 260px" />
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
import { addEvaluationLevel, modifyEvaluationLevel } from "@/api/quality";
import department from "@/components/Department";

export default {
  components: {
    department
  },
  data() {
    return {
      loading: false,
      dialog: false,
      // showType: true,
      form: {
        deptPath: undefined,
        year: new Date(),
        standard: "",
        productValue: "1",
        evaluationLevel: 1,
        score: 0,
        enable: "",
        type: undefined,
        minIndexValue: 0,
        maxIndexValue: 0
      },
      typeList: [{
        name: "国航",
        value: "0"
      },{
        name: "客户",
        value: "1"
      }],
      prodList: [],
      roleSelect: [],
      formRules: {
        standard: [
          { required: true, message: "关键指标分值标准不能为空", trigger: "blur" }
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
  computed: {
    showType() {
      return this.form.productValue == '1' || this.form.productValue == '4'
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
      addEvaluationLevel(this.form)
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
      modifyEvaluationLevel(this.form)
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
      // this.showType = true
      this.$refs["form"].resetFields();
      this.form = {
        deptPath: undefined,
        year: new Date(),
        standard: "",
        productValue: "1",
        evaluationLevel: 1,
        score: 0,
        enable: "",
        type: undefined,
        minIndexValue: 0,
        maxIndexValue: 0
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
