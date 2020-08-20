<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增危险源层级' : '编辑危险源层级'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-form-item label="编号">
        <el-input v-model="form.diskNo" style="width: 100%;" />
      </el-form-item>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="危险源层级一">
            <el-select
              clearable
              v-model="form.cateValue1"
              placeholder
              style="width: 100%;"
              @change="form.cateValue=''"
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
        <el-col :span="12">
          <el-form-item label="危险源层级二">
            <el-select clearable v-model="form.cateValue" placeholder style="width: 100%;">
              <el-option
                v-for="item in riskLevel2List"
                :key="item.key"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="危险源" prop="diskName">
        <el-input v-model="form.diskName" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="描述" prop="diskDesc">
        <el-input v-model="form.diskDesc" style="width: 100%;" />
      </el-form-item>
      <!-- <el-form-item label="诱因">
        <el-select v-model="selectIncentives" multiple filterable style="width: 100%;">
          <el-option
            v-for="item in incentivesList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="风险">
        <el-select
          v-model="selectRisks"
          multiple
          filterable
          style="width: 100%;"
          @change="riskChange"
          clearable
        >
          <el-option label="全选" value="-1"></el-option>
          <el-option
            v-for="item in risksList"
            :key="item.value"
            :value="item.value"
            :label="item.no+' - '+item.label"
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
  queryRiskList,
} from "@/api/standard";
import { re } from "../../../../utils/config-re";
import { queryDictByName } from "@/api/dict";

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        diskNo: "",
        diskName: "",
        diskDesc: "",
        enable: 0,
        cateValue1: "",
        cateValue: "",
      },
      formRules: {
        diskName: [
          { required: true, message: "危险源不能为空", trigger: "blur" },
        ],
        diskDesc: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ],
      },
      entArr: [],
      incentivesList: [],
      risksList: [],
      selectIncentives: [],
      selectRisks: [],
      riskLevel1List: [],
      riskLevel2List: [],
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    // this.queryIncentives();
    this.queryRisks();
    //危险源层级
    queryDictByName("hazard_source").then((res) => {
      if (res.code != "200") {
        this.$message.error(res.msg);
      } else {
        this.riskLevel1List = res.obj[0].children;
      }
    });
  },
  watch: {
    "form.cateValue1": {
      handler(val) {
        if (this.riskLevel1List.length > 0) {
          let list = this.riskLevel1List.filter((r) => r.value == val);
          if (list && list.length > 0) {
            this.riskLevel2List = list[0].children;
            // this.form.riskLevel2 = "";
          }
        }
      },
    },
  },
  computed: {
    quertForm() {
      let obj = {};
      // if (this.selectIncentives.length > 0) {
      //   obj.incentives = this.selectIncentives.join(",");
      // }
      if (this.selectRisks.length > 0) {
        obj.risks = this.selectRisks.join(",");
      }
      return obj;
    },
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
      addHazard(this.form, this.quertForm)
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
      modifyHazard(this.form, this.quertForm)
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
        diskNo: "",
        diskName: "",
        diskDesc: "",
        enable: 0,
        cateValue1: "",
        cateValue: "",
      };
      this.selectIncentives = [];
      this.selectRisks = [];
    },
    queryIncentives() {
      queryHazardList().then((res) => {
        if (res.code == "200") {
          res.obj.map((item) => {
            this.incentivesList.push({
              value: item.diskId,
              label: item.diskName,
            });
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    queryRisks() {
      queryRiskList().then((res) => {
        if (res.code == "200") {
          res.obj.map((item) => {
            this.risksList.push({
              value: item.riskListId,
              label: item.riskName,
              no: item.riskNo,
            });
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    riskChange(val) {
      if (val.includes("-1")) {
        this.selectRisks = ["-1"];
      }
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
