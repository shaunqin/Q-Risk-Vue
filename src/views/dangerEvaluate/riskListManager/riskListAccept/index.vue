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
      <el-table-column prop="cc" label="发布时间" />
      <el-table-column prop="dd" label="单据类型" />
      <el-table-column prop="ee" label="转发状态">
        <template slot-scope="scope">
          <el-tag effect="dark" type="warning" size="mini">{{scope.row.ee}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="showDetail(scope.row)">查看任务详情</el-button>
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
    <risk-accept-detail ref="riskAcceptDetail"></risk-accept-detail>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import riskAcceptDetail from "../components/riskAcceptDetail";
export default {
  components: { riskAcceptDetail },
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
        aa: "TA20200512836-" + i,
        bb: "整改通知单编号",
        cc: "2020-05-12 16:16:15",
        dd: "带检查单",
        ee: "已分派",
        ff: "测试",
        gg: "测试",
        hh: "测试",
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
      let _this = this.$refs.riskAcceptDetail;
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