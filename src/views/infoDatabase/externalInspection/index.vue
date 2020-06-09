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
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-s-data">统计</el-button>
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
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="aa" label="参考号" />
      <el-table-column prop="bb" label="发生时间" width="100" />
      <el-table-column prop="cc" label="责任单位一" width="120" />
      <el-table-column prop="dd" label="责任单位二" width="120" />
      <el-table-column prop="ee" label="责任部门" />
      <el-table-column prop="ff" label="产品" width="120" />
      <el-table-column prop="gg" label="系统" />
      <el-table-column prop="hh" label="问题描述" />
      <el-table-column prop="ii" label="危险源分类一" width="110" />
      <el-table-column prop="jj" label="危险源分类二" width="110" />
      <el-table-column prop="kk" label="危险源" />
      <el-table-column prop="ll" label="风险" />
      <el-table-column prop="mm" label="诱因" />
      <el-table-column prop="nn" label="危险源次数" width="100" />
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
import {infoDatabase} from '@/dataSource';
export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  mounted() {
    this.loading = false;
    this.data=infoDatabase;
  },
  methods: {
    toQuery(name) {
      if (!name) {
        this.page = 1;
        this.init();
        return;
      }
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      _this.form = Object.assign({}, row);
      _this.dialog = true;
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
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