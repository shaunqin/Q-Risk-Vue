<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
    <editform ref="editform" :is-add="isAdd"></editform>
    <upload-excel ref="uploadExcel" type="2"></upload-excel>
    <div class="head-container">
      <esearch ref="search" />
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-upload"
        @click="upload"
      >导入</el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-download"
        :loading="downloadLoading"
        @click="download"
      >导出</el-button>
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
    >
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="infoSourceText" label="信息来源" width="100" />
      <el-table-column label="发生日期" width="100">
        <template slot-scope="{row}">
          <span v-if="row.happenDate!=null">{{format(row.happenDate).substring(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="place" label="地点" />
      <el-table-column prop="aircraftTypeText" label="机型" />
      <el-table-column prop="title" label="标题" width="120" show-overflow-tooltip />
      <el-table-column prop="causeAnalysis" label="原因分析" width="120" show-overflow-tooltip />
      <el-table-column prop="departmentNameCn" label="责任单位" width="120" show-overflow-tooltip />
      <el-table-column prop="productText" label="产品" width="120" />
      <el-table-column prop="systemText" label="系统" width="110" />
      <el-table-column prop="riskLevelText1" label="危险源层级一" width="110" />
      <el-table-column prop="riskLevelText2" label="危险源层级二" width="110" />
      <el-table-column prop="sourceOfRiskText" label="危险源" width="120" show-overflow-tooltip />
      <el-table-column prop="risk" label="风险" width="120" />
      <el-table-column prop="incentive" label="诱因" width="120" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import eform from "./form";
import editform from "./editForm";
import esearch from "../components/search2";
import { format } from "@/utils/datetime";
import { detailInfobase, delInfobase, downloadToExcel } from "@/api/infodb";
import uploadExcel from "../components/uploadExcel";
import { saveAs } from "file-saver";
export default {
  components: { eform, esearch, uploadExcel, editform },
  mixins: [initData],
  data() {
    return {
      downloadLoading: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    format,
    beforeInit() {
      this.url = `/infoDatabase_mgr/infoDatabase_mgr/query/pageList/${this.page}/${this.size}`;
      this.params = { type: 2, ...this.params };
      return true;
    },
    toQuery(name) {
      // if (!name) {
      //   this.page = 1;
      //   this.init();
      //   return;
      // }
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.editform;
      detailInfobase(row.id).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          const { obj } = res;
          _this.form = {
            id: obj.id,
            infoSource: obj.infoSource,
            happenDate: obj.happenDate,
            place: obj.place,
            riskLevel1: obj.riskLevel1,
            riskLevel2: obj.riskLevel2,
            sourceOfRisk: obj.sourceOfRisk,
            aircraftType: obj.aircraftType,
            responsibleUnit: obj.responsibleUnit,
            product: obj.product,
            systemCode: obj.systemCode,
            eventOverview: obj.eventOverview,
            causeAnalysis: obj.causeAnalysis,
            risk: obj.risk,
            incentive: obj.incentive,
            type: obj.type,
          };
          _this.files = obj.filesList;
          _this.dialog = true;
        }
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delInfobase(id).then((res) => {
            if (res.code != "200") {
              this.$message.error(res.msg);
            } else {
              this.$message.success("删除成功");
              this.init();
            }
          });
        })
        .catch(() => { });
    },
    upload() {
      this.$refs.uploadExcel.dialog = true;
    },
    download() {
      this.downloadLoading = true;
      let data = { type: "2", ...this.$refs.search.queryForm };
      const qs = require("qs");
      location.href = `${process.env.VUE_APP_BASE_API
        }/infoDatabase_mgr/infoDatabase_mgr/downloadToExcel?${qs.stringify(data)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
</style>