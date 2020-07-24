<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
    <div class="head-container">
      <el-input
        size="mini"
        v-model="query"
        clearable
        placeholder="请输入你要搜索的内容"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(query)"
      >搜索</el-button>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="add">新增</el-button>
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
      <el-table-column type="index" width="50" />
      <el-table-column prop="id" label="编号" />
      <el-table-column label="发生日期" width="120">
        <template slot-scope="{row}">{{row.date_time.substring(0,10)}}</template>
      </el-table-column>
      <el-table-column prop="problem_description" label="问题描述" width="200" />
      <el-table-column prop="cc" label="责任单位层级一" width="120" />
      <el-table-column prop="dd" label="责任单位层级二" width="120" />
      <el-table-column prop="responsible_unit" label="责任部门" />
      <el-table-column prop="product" label="产品" width="120" />
      <el-table-column prop="system" label="系统" />
      <el-table-column prop="risk_level_1" label="危险源层级一" width="110" />
      <el-table-column prop="risk_level_2" label="危险源层级二" width="110" />
      <el-table-column prop="source_of_risk" label="危险源" />
      <el-table-column prop="risk" label="风险" />
      <el-table-column prop="incentive" label="诱因" />
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
import { detailSuperviseSa } from "@/api/infodb";
export default {
  components: { eform },
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
    beforeInit() {
      this.url = `/info_mgr/supervise_mgr/query/pageListSa/${this.page}/${this.size}`;
      return true;
    },
    toQuery(name) {
      if (!name) {
        this.page = 1;
        this.init();
        return;
      }
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      detailSuperviseSa(row.id).then((res) => {
        const { obj } = res;
        _this.form = {
          id: obj.id,
          date_time: obj.date_time,
          incentive: obj.incentive,
          problem_description: obj.problem_description,
          product: obj.product,
          responsible_unit: obj.responsible_unit,
          risk: obj.risk,
          risk_level_1: obj.risk_level_1,
          risk_level_2: obj.risk_level_2,
          source_of_risk: obj.source_of_risk,
          system: obj.system,
        };
        _this.dialog = true;
      });
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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