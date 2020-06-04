<template>
  <div class="container-body">
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
      <el-table-column prop="aa" label="编号" />
      <el-table-column prop="bb" label="任务名称" />
      <el-table-column prop="cc" label="发布者" />
      <el-table-column prop="dd" label="单据类型" />
      <el-table-column prop="ee" label="发布时间" width="200px" />
      <el-table-column prop="ff" label="任务类型" />
      <el-table-column prop="gg" label="分发状态">
        <template slot-scope="scope">
          <el-tag effect="dark" :type="scope.row.gg=='已分派'?'warning':'danger'" size="mini">{{scope.row.gg}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="hh" label="代表部门" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="showDetail(scope.row)">查看任务</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;float: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <!-- 查看任务详情 -->
    <risk-list-detail ref="riskListDetail"></risk-list-detail>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import riskListDetail from "../components/riskListDetail";
export default {
  components: { riskListDetail },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      value1: ""
    };
  },
  mounted() {
    this.loading = false;
    for (let i = 0; i < 5; i++) {
      this.data.push({
        aa: "TA2020836-" + i,
        bb: "退回测试" + i,
        cc: "胡子铮",
        dd: "无检查单",
        ee: "2020-05-27 15:45:48.0",
        ff: "质量监督",
        gg: i % 2 == 0 ? "已分派" : "未分派",
        hh: "成都分公司",
        ii: "",
        jj: "",
        kk: "测试",
        ll: "测试",
        mm: "测试",
        nn: "测试"
      });
    }
  },
  methods: {
    toQuery(name) {
      if (!name) {
        this.page = 1;
        this.init();
        return;
      }
    },

    showDetail(row) {
      let _this = this.$refs.riskListDetail;
      _this.dialog = true;
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