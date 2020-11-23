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
        <el-col :span="6">
          <el-form-item label="信息来源" prop="infoSource">
            <dict-select
              :value="form.infoSource"
              type="info_source"
              @change="dictChange($event,'infoSource',form)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发生日期" prop="happenDate">
            <el-date-picker v-model="form.happenDate" placeholder style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地点" prop="place">
            <el-input v-model="form.place" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机型" prop="aircraftType">
            <dict-select
              :value="form.aircraftType"
              type="aircraft"
              @change="dictChange($event,'aircraftType',form)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="24">
          <el-form-item label="事件概述" prop="eventOverview">
            <el-input v-model="form.eventOverview" type="textarea" rows="3" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="风险" prop="risk">
            <risk-select :value="form.risk" @change="riskChange"></risk-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <template slot="label">
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="addRow"></el-button>
        </template>
        <el-table :data="data" size="mini" max-height="400px">
          <el-table-column label="原因分析" min-width="300">
            <template slot-scope="{row}">
              <el-input v-model="row.causeAnalysis" placeholder type="textarea" rows="3"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="危险源层级一" width="140">
            <template slot-scope="{row}">
              <el-select
                clearable
                v-model="row.riskLevel1"
                placeholder
                style="width: 100%;"
                @change="row.riskLevel2= row.sourceOfRisk=''"
              >
                <el-option
                  v-for="item in riskLevel1List"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="危险源层级二" width="140">
            <template slot-scope="{row}">
              <riskLevel2CP
                :value="row.riskLevel2"
                :list="riskLevel1List"
                :riskLevel1="row.riskLevel1"
                @change="riskLevel2Change($event,row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="危险源" width="140">
            <template slot-scope="{row}">
              <el-select
                clearable
                filterable
                v-model="row.sourceOfRisk"
                placeholder
                style="width: 100%;"
              >
                <el-option
                  v-for="item in riskList.filter(r=>r.cateValue==row.riskLevel2)"
                  :key="item.diskNo"
                  :label="item.diskName"
                  :value="item.diskNo"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="责任单位" width="200">
            <template slot-scope="{row}">
              <department :value="row.responsibleUnit" @change="deptChange($event,row)"></department>
            </template>
          </el-table-column>
          <el-table-column label="产品" width="140">
            <template slot-scope="{row}">
              <dict-select
                :value="row.product"
                type="product"
                @change="dictChange($event,'product',row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="系统" width="140">
            <template slot-scope="{row}">
              <dict-select
                :value="row.systemCode"
                type="system"
                @change="dictChange($event,'systemCode',row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="诱因" width="500">
            <template slot-scope="{row}">
              <incentive-select :value="row.incentive" @change="incentiveChange($event,row)"></incentive-select>
            </template>
          </el-table-column>
          <el-table-column label="附件" min-width="130">
            <template slot-scope="{row}">
              <eupload v-if="row.filesId.length==0" @success="uploadSuccess($event,row)"></eupload>
              <div v-else>
                <el-link
                  type="primary"
                  :href="row.filesId[0].url"
                  target="_blank"
                >{{row.filesId[0].originFileName}}</el-link>
                <el-button type="text" icon="el-icon-close" @click="delFile(row)"></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label>
            <template slot-scope="{$index}">
              <el-button type="text" icon="el-icon-delete" @click="delRows($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
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
import dictSelect from "@/components/common/dictSelect";
import eupload from "@/components/Upload/index";
import riskLevel2CP from "../components/riskLevel2CP";

export default {
  components: {
    department,
    riskSelect,
    incentiveSelect,
    dictSelect,
    eupload,
    riskLevel2CP,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        infoSource: "",
        happenDate: "",
        place: "",
        aircraftType: "",
        eventOverview: "",
        risk: "",
        type: "1",
      },
      roleSelect: [],
      formRules: {
        infoSource: [
          { required: true, message: "信息来源不能为空", trigger: "blur" },
        ],
        happenDate: [
          { required: true, message: "发生日期不能为空", trigger: "blur" },
        ],
        riskLevel1: [
          { required: true, message: "危险源层级一不能为空", trigger: "blur" },
        ],
        riskLevel2: [
          { required: true, message: "危险源层级二不能为空", trigger: "blur" },
        ],
        sourceOfRisk: [
          { required: true, message: "危险源不能为空", trigger: "blur" },
        ],
        aircraftType: [
          { required: true, message: "机型不能为空", trigger: "blur" },
        ],
        responsibleUnit: [
          { required: true, message: "责任单位不能为空", trigger: "blur" },
        ],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" }],
        systemCode: [
          { required: true, message: "系统不能为空", trigger: "blur" },
        ],
        eventOverview: [
          { required: true, message: "事件概述不能为空", trigger: "blur" },
        ],
        causeAnalysis: [
          { required: true, message: "原因分析不能为空", trigger: "blur" },
        ],
        risk: [{ required: true, message: "风险不能为空", trigger: "blur" }],
        incentive: [
          { required: true, message: "诱因不能为空", trigger: "blur" },
        ],
      },
      entArr: [],
      infobaseList: [],
      riskLevel1List: [],
      riskLevel2List: [],
      riskList: [],
      airList: [],
      files: [],
      data: [
        {
          riskLevel1: "",
          riskLevel2: "",
          sourceOfRisk: "",
          responsibleUnit: null,
          product: "",
          systemCode: "",
          causeAnalysis: "",
          incentive: "",
          filesId: [],
        },
      ],
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
          let list = this.riskLevel1List.filter((r) => r.value == val);
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
    form: {
      handler(val) {
        for (let x in val) {
          if (!!val[x]) {
            this.$refs.form.clearValidate(x);
          }
        }
      },
      deep: true,
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
          }
        }
      });
    },
    doAdd() {
      let subData = [];
      this.data.map((item) => {
        let filesId = item.filesId.map((r) => r.id);
        subData.push({
          ...this.form,
          ...item,
          filesId,
        });
      });
      addInfobase(subData)
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
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        infoSource: "",
        happenDate: "",
        place: "",
        aircraftType: "",
        eventOverview: "",
        risk: "",
        type: "1",
      };
      // this.files = [];
      // this.$refs.incentive.value1 = "";
      this.data = [
        {
          riskLevel1: "",
          riskLevel2: "",
          sourceOfRisk: "",
          responsibleUnit: null,
          product: "",
          systemCode: "",
          causeAnalysis: "",
          incentive: "",
          filesId: [],
        },
      ];
    },
    dictChange(val, key, row) {
      row[key] = val;
    },
    deptChange(val, row) {
      row.responsibleUnit = val;
    },
    riskChange(val) {
      this.form.risk = val.join(",");
    },
    incentiveChange(val, row) {
      row.incentive = val.join(",");
    },
    uploadSuccess(response, row) {
      console.log(response);
      row.filesId = [response.obj];
    },
    delFile(row) {
      row.filesId = [];
    },
    addRow() {
      this.data.push({
        riskLevel1: "",
        riskLevel2: "",
        sourceOfRisk: "",
        responsibleUnit: null,
        product: "",
        systemCode: "",
        causeAnalysis: "",
        incentive: "",
        filesId: [],
      });
    },
    delRows(index) {
      this.data.splice(index, 1);
    },
    riskLevel2Change(val, row) {
      row.riskLevel2 = val;
      row.sourceOfRisk = "";
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
