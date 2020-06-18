<template>
  <div class="app-container">
    <detail ref="detail"></detail>
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
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="aa" label="单据号" />
      <el-table-column prop="bb" label="任务名称" />
      <el-table-column prop="dd" label="发起时间-截至时间" />
      <el-table-column prop="cc" label="类型" />
      <el-table-column label="操作" width="130px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="detail(scope.row)">查看</el-button>
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
import detail from "../components/detail";
export default {
  components: { detail },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
      title: ""
    };
  },
  // created () {
  //   this.$nextTick(()=>{
  //     this.init()
  //   });
  // },
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "123456",
        bb: "测试内容111",
        cc: "风险清单",
        dd: "2020/06/01 - 2020/06/30"
      },
      {
        aa: "156325",
        bb: "测试内容222",
        cc: "风险措施",
        dd: "2020/06/01 - 2020/06/30"
      },
      {
        aa: "961258",
        bb: "测试内容333",
        cc: "实施结果",
        dd: "2020/06/01 - 2020/06/30"
      }
    ];
  },
  methods: {
    beforeInit() {
      this.url = "/notice/list";
      return true;
    },
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
    jumpdetail(row) {
      let url = "";
      switch (row.cc) {
        case "风险清单":
          url = "/dangerEvaluate/riskListManager/riskListAccept";
          break;
        case "风险措施":
          url = "/dangerEvaluate/riskMeasureReport/riskMeasureConfirm";
          break;
        case "实施结果":
          url =
            "/dangerEvaluate/implementationResultsReport/riskImplementationConfirm";
          break;
      }
      return url;
    },
    detail(row) {
      let _this = this.$refs.detail;
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