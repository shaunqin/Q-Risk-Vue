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
        <el-col :span="8">
          <el-form-item label="信息来源">
            <dict-select
              :value="form.infoSource"
              type="info_source"
              @change="dictChange($event,'infoSource')"
            />
          </el-form-item>
          <el-form-item label="危险源层级一">
            <el-select
              clearable
              v-model="form.riskLevel1"
              placeholder
              style="width: 100%;"
              @change="form.riskLevel2=''"
            >
              <el-option
                v-for="item in riskLevel1List"
                :key="item.key"
                :label="item.name"
                :value="item.externMap.dicCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发生日期">
            <el-date-picker v-model="form.happenDate" placeholder style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="危险源层级二">
            <el-select clearable v-model="form.riskLevel2" placeholder style="width: 100%;">
              <el-option
                v-for="item in riskLevel2List"
                :key="item.key"
                :label="item.name"
                :value="item.externMap.dicCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地点">
            <el-input v-model="form.place" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="危险源">
            <el-select
              clearable
              filterable
              v-model="form.sourceOfRisk"
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
          <el-form-item label="机型">
            <dict-select
              :value="form.aircraftType"
              type="aircraft"
              @change="dictChange($event,'aircraftType')"
            />
          </el-form-item>
          <el-form-item label="产品">
            <dict-select
              :value="form.product"
              type="product"
              @change="dictChange($event,'product')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="责任单位">
            <department :value="form.responsibleUnit" @change="deptChange"></department>
          </el-form-item>
          <el-form-item label="系统">
            <dict-select
              :value="form.systemCode"
              type="system"
              @change="dictChange($event,'systemCode')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事件概述">
            <el-input v-model="form.eventOverview" type="textarea" rows="3" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="原因分析">
            <el-input v-model="form.causeAnalysis" type="textarea" rows="3" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="风险">
            <risk-select :value="form.risk" @change="riskChange"></risk-select>
          </el-form-item>
          <el-form-item label="诱因">
            <incentive-select :value="form.incentive" @change="incentiveChange"></incentive-select>
          </el-form-item>
          <el-form-item label="附件上传">
            <eupload @success="uploadSuccess"></eupload>
          </el-form-item>
          <el-form-item label>
            <el-table :data="files" size="mini">
              <el-table-column label="文件名" prop="originFileName" />
              <el-table-column label="文件大小">
                <template slot-scope="{row}">{{(row.fileSize/1024).toFixed(2)}}Kb</template>
              </el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="{row,$index}">
                  <el-tooltip content="预览" placement="left">
                    <el-link type="primary" :underline="false" :href="row.url" target="_blank">
                      <svg-icon icon-class="eye-open"></svg-icon>
                    </el-link>
                  </el-tooltip>&nbsp;&nbsp;
                  <el-button type="text" icon="el-icon-delete" @click="delFile($index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
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
import { addInfobase, modifyInfobase } from "@/api/infodb";
import { queryDictByName } from "@/api/dict";
import { queryHazardList } from "@/api/standard";
import department from "@/components/Department";
import riskSelect from "../components/riskSelect";
import incentiveSelect from "../components/incentiveSelect";
import dictSelect from "../components/dictSelect";
import eupload from "@/components/Upload/index";

export default {
  components: {
    department,
    riskSelect,
    incentiveSelect,
    dictSelect,
    eupload,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        infoSource: "",
        happenDate: "",
        place: "",
        riskLevel1: "",
        riskLevel2: "",
        sourceOfRisk: "",
        aircraftType: "",
        responsibleUnit: null,
        product: "",
        systemCode: "",
        eventOverview: "",
        causeAnalysis: "",
        risk: "",
        incentive: "",
        filesId: [],
        type: "1",
      },
      roleSelect: [],
      formRules: {
        aa: [{ required: true, message: "请填写名称", trigger: "blur" }],
        bb: [{ required: true, message: "请填写名称", trigger: "blur" }],
      },
      entArr: [],
      infobaseList: [],
      riskLevel1List: [],
      riskLevel2List: [],
      riskList: [],
      airList: [],
      files: [],
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    "form.riskLevel1": {
      handler(val) {
        if (this.riskLevel1List.length > 0) {
          let list = this.riskLevel1List.filter(
            (r) => r.externMap.dicCode == val
          );
          if (list && list.length > 0) {
            this.riskLevel2List = list[0].children;
            // this.form.riskLevel2 = "";
          }
        }
      },
    },
    files(val) {
      if (val && val.length > 0) this.form.filesId = val.map((r) => r.id);
      else this.form.filesId = [];
    },
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
      addInfobase(this.form)
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
      modifyInfobase(this.form)
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
        infoSource: "",
        happenDate: "",
        place: "",
        riskLevel1: "",
        riskLevel2: "",
        sourceOfRisk: "",
        aircraftType: "",
        responsibleUnit: null,
        product: "",
        systemCode: "",
        eventOverview: "",
        causeAnalysis: "",
        risk: "",
        incentive: "",
        filesId: [],
        type: "1",
      };
      this.files = [];
    },
    dictChange(val, key) {
      this.form[key] = val;
    },
    deptChange(val) {
      this.form.responsibleUnit = val;
    },
    riskChange(val) {
      this.form.risk = val.join(",");
    },
    incentiveChange(val) {
      this.form.incentive = val.join(",");
    },
    uploadSuccess(response) {
      console.log(response);
      this.files.push(response.obj);
    },
    delFile(index) {
      this.files.splice(index, 1);
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
