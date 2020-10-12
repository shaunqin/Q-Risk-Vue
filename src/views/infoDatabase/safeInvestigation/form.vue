<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="80px">
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
            <el-input
              v-model="form.place"
              style="width: 100%;"
              placeholder="请输入城市名称"
              @blur="checkPlace"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机型">
            <dict-select
              :value="form.aircraftType"
              type="aircraft"
              @change="dictChange($event,'aircraftType',form)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="事件概述" prop="eventOverview">
            <el-input v-model="form.eventOverview" type="textarea" rows="3" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="风险" prop="risk">
            <risk-select :value="form.risk" @change="riskChange" style="width: 50%;"></risk-select>
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
      <el-card v-for="(row,index) in data" :key="index" style="margin-bottom:20px">
        <el-form-item label="原因分析">
          <el-input v-model="row.causeAnalysis" placeholder type="textarea" rows="4"></el-input>
        </el-form-item>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="责任单位">
              <department :value="row.responsibleUnit" @change="deptChange($event,row)"></department>
            </el-form-item>
            <el-form-item label="危险源层级一" label-width="100px">
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
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品">
              <dict-select
                :value="row.product"
                type="product"
                @change="dictChange($event,'product',row)"
              />
            </el-form-item>
            <el-form-item label="危险源层级二" label-width="100px">
              <riskLevel2CP
                :value="row.riskLevel2"
                :list="riskLevel1List"
                :riskLevel1="row.riskLevel1"
                @change="riskLevel2Change($event,row)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统">
              <dict-select
                :value="row.systemCode"
                type="system"
                @change="dictChange($event,'systemCode',row)"
              />
            </el-form-item>
            <el-form-item label="危险源">
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="诱因分类">
          <incentive-select :value="row.incentive" @change="incentiveChange($event,row)"></incentive-select>
        </el-form-item>
        <el-form-item label style="text-align: center;">
          <el-button type="danger" icon="el-icon-delete" @click="delRows(index)">删除</el-button>
        </el-form-item>
      </el-card>
      <el-form-item>
        <el-button type="info" size="mini" icon="el-icon-plus" @click="addRow">新增原因分析</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" @click="doSave">暂存</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addInfobase } from "@/api/infodb";
import { queryDictByName } from "@/api/dict";
import { queryHazardList } from "@/api/standard";
import department from "@/components/Department";
import riskSelect from "../components/riskSelect";
import incentiveSelect from "../components/incentiveSelect";
import dictSelect from "@/components/common/dictSelect";
import eupload from "@/components/Upload/index";
import riskLevel2CP from "../components/riskLevel2CP";
import { re } from '@/utils/config-re'

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
        title: "",
        eventOverview: "",
        risk: "",
        filesId: [],
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
        responsibleUnit: [
          { required: true, message: "责任单位不能为空", trigger: "blur" },
        ],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" }],
        systemCode: [
          { required: true, message: "系统不能为空", trigger: "blur" },
        ],
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
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
    doSave() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.form.status = "1";
            this.doAdd();
          }
        }
      });
    },
    doAdd() {
      let subData = [];
      this.data.map((item) => {
        subData.push({
          ...this.form,
          ...item,
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
        title: "",
        eventOverview: "",
        risk: "",
        type: "1",
      };
      this.files = [];
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
      this.form.risk = val;
    },
    incentiveChange(val, row) {
      row.incentive = val.join(",");
    },
    uploadSuccess(response) {
      console.log(response);
      this.files.push(response.obj);
    },
    delFile(index) {
      this.files.splice(index, 1);
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
      });
    },
    delRows(index) {
      this.data.splice(index, 1);
    },
    riskLevel2Change(val, row) {
      row.riskLevel2 = val;
      row.sourceOfRisk = "";
    },
    checkPlace(e) {
      let value = e.target.value;
      if (value) {
        if (!re.chinese.test(value)) {
          this.$message.error("地点请输入中文！");
          this.form.place = "";
        }
      }
    }
  },
};
</script>


<style lang="scss" scoped>
</style>
