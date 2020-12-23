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
      <el-form-item label="发生日期" prop="dateTime">
        <el-date-picker v-model="form.dateTime" placeholder :disabled="!isAdd"></el-date-picker>
      </el-form-item>
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="责任部门" prop="responsibleUnit">
            <department :value="form.responsibleUnit" @change="deptChange" :disabled="!isAdd"></department>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="危险源层级一" prop="riskLevel1">
            <el-select
              clearable
              v-model="form.riskLevel1"
              placeholder
              style="width: 100%;"
              @change="form.riskLevel2 = form.sourceOfRisk= ''"
            >
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
          <el-form-item label="危险源层级二" prop="riskLevel2">
            <el-select clearable v-model="form.riskLevel2" placeholder style="width: 100%;" @change="form.sourceOfRisk = ''">
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
          <el-form-item label="危险源" prop="sourceOfRisk">
            <el-select
              clearable
              filterable
              v-model="form.sourceOfRisk"
              placeholder
              style="width: 100%;"
              @change="$forceUpdate()"
            >
              <el-option
                v-for="item in riskList.filter(r=>r.cateValue==form.riskLevel2)"
                :key="item.diskNo"
                :label="item.diskName"
                :value="item.diskNo"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品" prop="product">
            <dict-select
              :value="form.product"
              type="product"
              @change="dictChange($event,'product')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统" prop="system">
            <dict-select :value="form.system" type="system" @change="dictChange($event,'system')" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="风险" prop="risk">
        <risk-select :value="form.risk" @change="riskChange"></risk-select>
      </el-form-item>
      <el-form-item label="诱因" prop="incentive">
        <incentive-select ref="incentive" :value="form.incentive" @change="incentiveChange"></incentive-select>
      </el-form-item>
      <el-form-item label="问题描述" prop="incentive">
        <el-input v-model="form.problemDescription" type="textarea" rows="3" style="width: 100%;" :disabled="!isAdd" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSupervise, modifySupervise } from "@/api/infodb";
import { queryDictByName } from "@/api/dict";
import { queryHazardList } from "@/api/standard";
import department from "@/components/Department";
import riskSelect from "../components/riskSelect";
import incentiveSelect from "../components/incentiveSelect";
import dictSelect from "@/components/common/dictSelect";

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
        dateTime: "",
        incentive: "",
        problemDescription: "",
        product: "",
        responsibleUnit: null,
        risk: "",
        riskLevel1: "",
        riskLevel2: "",
        sourceOfRisk: "",
        system: "",
        dataType: "7",
      },
      roleSelect: [],
      formRules: {
        dateTime: [
          { required: true, message: "发生日期不能为空", trigger: "blur" },
        ],
        /* responsibleUnit: [
          { required: true, message: "责任部门不能为空", trigger: "change" },
        ], */
        riskLevel1: [
          { required: true, message: "危险源层级一不能为空", trigger: "blur" },
        ],
        riskLevel2: [
          { required: true, message: "危险源层级二不能为空", trigger: "blur" },
        ],
        sourceOfRisk: [
          { required: true, message: "危险源不能为空", trigger: "blur" },
        ],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" }],
        system: [{ required: true, message: "系统不能为空", trigger: "blur" }],
        risk: [{ required: true, message: "风险不能为空", trigger: "blur" }],
        incentive: [
          { required: true, message: "诱因不能为空", trigger: "blur" },
        ],
        problemDescription: [
          { required: true, message: "问题描述不能为空", trigger: "blur" },
        ],
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
    "form.riskLevel1": {
      handler(val) {
        if (this.riskLevel1List.length > 0) {
          let list = this.riskLevel1List.filter(
            (r) => r.value == val
          );
          if (list && list.length > 0) {
            this.riskLevel2List = list[0].children;
          }
          this.$forceUpdate()
        }
      },
    },
    form: {
      handler(val) {
        if (this.$refs.form != null) {
          for (let x in val) {
            if (!!val[x]) {
              this.$refs.form.clearValidate(x);
            }
          }
          this.$forceUpdate()
        }
      },
      deep: true,
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
          this.$forceUpdate()
        }
      });
      //危险源
      queryHazardList().then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.riskList = res.obj;
          this.$forceUpdate()
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
      addSupervise(this.form)
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
        dateTime: "",
        incentive: "",
        problemDescription: "",
        product: "",
        responsibleUnit: null,
        risk: "",
        riskLevel1: "",
        riskLevel2: "",
        sourceOfRisk: "",
        system: "",
        dataType: "7",
      };
      this.$refs.incentive.value1 = "";
      this.$forceUpdate()
    },
    dictChange(val, key) {
      this.form[key] = val;
      this.$forceUpdate()
    },
    deptChange(val) {
      this.form.responsibleUnit = val;
      this.$forceUpdate()
    },
    riskChange(val) {
      this.form.risk = val;
      this.$forceUpdate()
    },
    incentiveChange(val) {
      this.form.incentive = val.join(",");
      this.$forceUpdate()
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1000px;
}
</style>
