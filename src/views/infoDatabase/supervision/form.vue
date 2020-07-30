<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row :gutter="16">
        <el-form-item label="发生日期">
          <el-date-picker v-model="form.date_time" placeholder></el-date-picker>
        </el-form-item>
        <el-col :span="8">
          <el-form-item label="责任单位层级一">
            <el-input v-model="form.cc" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="危险源层级一">
            <el-select clearable v-model="form.risk_level_1" placeholder style="width: 100%;">
              <el-option
                v-for="item in riskLevel1List"
                :key="item.key"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任单位层级二">
            <el-input v-model="form.dd" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="危险源层级二">
            <el-select clearable v-model="form.risk_level_2" placeholder style="width: 100%;">
              <el-option
                v-for="item in riskLevel2List"
                :key="item.key"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任部门">
            <department :value="form.responsible_unit" @change="deptChange"></department>
          </el-form-item>
          <el-form-item label="危险源">
            <el-select
              clearable
              filterable
              v-model="form.source_of_risk"
              placeholder
              style="width: 100%;"
            >
              <el-option
                v-for="item in riskList"
                :key="item.diskNo"
                :label="item.diskName"
                :value="item.diskNo"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品">
            <dict-select
              :value="form.product"
              type="product"
              @change="dictChange($event,'product')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统">
            <dict-select :value="form.system" type="system" @change="dictChange($event,'system')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="风险">
        <risk-select :value="form.risk" @change="riskChange"></risk-select>
      </el-form-item>
      <el-form-item label="诱因">
        <incentive-select :value="form.incentive" @change="incentiveChange"></incentive-select>
      </el-form-item>
      <el-form-item label="问题描述">
        <el-input v-model="form.problem_description" type="textarea" rows="3" style="width: 100%;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { modifySupervise } from "@/api/infodb";
import { queryDictByName } from "@/api/dict";
import { queryHazardList } from "@/api/standard";
import department from "@/components/Department";
import riskSelect from "../components/riskSelect";
import incentiveSelect from "../components/incentiveSelect";
import dictSelect from "../components/dictSelect";

export default {
  components: {
    department,
    riskSelect,
    incentiveSelect,
    dictSelect,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        date_time: "",
        incentive: "",
        problem_description: "",
        product: "",
        responsible_unit: "",
        risk: "",
        risk_level_1: "",
        risk_level_2: "",
        source_of_risk: "",
        system: "",
      },
      roleSelect: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
      entArr: [],
      riskLevel1List: [],
      riskLevel2List: [],
      riskList: [],
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    "form.risk_level_1": {
      handler(val) {
        if (this.riskLevel1List.length > 0) {
          let list = this.riskLevel1List.filter((r) => r.value == val);
          if (list && list.length > 0) {
            this.riskLevel2List = list[0].children;
            this.form.risk_level_2 = "";
          }
        }
      },
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      //危险源层级
      queryDictByName("hazard_source").then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.riskLevel1List = res.obj[0].children;
        }
      });
      //危险源
      queryHazardList().then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.riskList = res.obj;
        }
      });
    },
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
          } else {
            this.$message.error(res.msg);
          }
          this.resetForm();
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    doModify() {
      modifySupervise(this.form)
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
        date_time: "",
        incentive: "",
        problem_description: "",
        product: "",
        responsible_unit: "",
        risk: "",
        risk_level_1: "",
        risk_level_2: "",
        source_of_risk: "",
        system: "",
      };
    },
    dictChange(val, key) {
      this.form[key] = val;
    },
    deptChange(val) {
      this.form.responsible_unit = val;
    },
    riskChange(val) {
      this.form.risk = val.join(",");
    },
    incentiveChange(val) {
      this.form.incentive = val.join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1000px;
}
</style>
