<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
    <div class="head-container">
      <esearch />
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-download">导出</el-button>
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
      <el-table-column prop="id" label="编号" />
      <el-table-column label="发生日期" width="120">
        <template slot-scope="{row}">
          <span v-if="row.dateTime!=null">{{format(row.dateTime).substring(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="problemDescription" label="问题描述" width="200" show-overflow-tooltip />
      <el-table-column prop="deptName1" label="责任单位层级一" width="120" />
      <el-table-column prop="deptName2" label="责任单位层级二" width="120" />
      <el-table-column prop="departmentNameCn" label="责任部门" width="120" show-overflow-tooltip />
      <el-table-column prop="productName" label="产品" width="120" />
      <el-table-column prop="systemName" label="系统" />
      <el-table-column prop="riskLevelName1" label="危险源层级一" width="110" />
      <el-table-column prop="riskLevelName2" label="危险源层级二" width="110" />
      <el-table-column prop="sourceOfRiskName" label="危险源" width="200" show-overflow-tooltip />
      <el-table-column prop="risk" label="风险" width="120" show-overflow-tooltip />
      <el-table-column prop="incentive" label="诱因" width="120" show-overflow-tooltip />
      <el-table-column prop="cc" label="危险源次数" width="100" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.userName !== userInfo.userName"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          />
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
import esearch from "./search";
import { detailSupervise, delSupervise } from "@/api/infodb";
import { format } from "@/utils/datetime";
export default {
  components: { eform, esearch },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    format,
    beforeInit() {
      this.url = `/info_mgr/supervise_mgr/query/pageList/${this.page}/${this.size}`;
      this.params.dataType = "5";
      return true;
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      detailSupervise(row.id).then((res) => {
        const { obj } = res;
        _this.form = {
          id: obj.id,
          dateTime: obj.dateTime,
          incentive: obj.incentive,
          problemDescription: obj.problemDescription,
          product: obj.product,
          responsibleUnit: obj.responsibleUnit,
          risk: obj.risk,
          riskLevel1: obj.riskLevel1,
          riskLevel2: obj.riskLevel2,
          sourceOfRisk: obj.sourceOfRisk,
          system: obj.system,
          dataType: obj.dataType,
        };
        _this.dialog = true;
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          delSupervise(id).then((res) => {
            if (res.code != "200") {
              this.$message.error(res.msg);
            } else {
              this.$message.success("删除成功!");
              this.init();
            }
          });
        })
        .catch(() => {});
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
/deep/ .el-tooltip__popper {
  width: 600px;
}
</style>
