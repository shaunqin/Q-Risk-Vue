<template>
  <div class="container-body">
    <div class="head-container"></div>
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
      <el-table-column prop="bb" label="名称" />
      <el-table-column prop="cc" label="发布时间" />
      <el-table-column prop="dd" label="风险措施状态" align="left">
        <template slot-scope="scope">
          <el-tag type size="mini" effect="dark">{{scope.row.dd}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px" align="left" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="showDetail(scope.row)"
          >查看风险措施</el-button>
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
    <!-- 查看整改措施 -->
    <implementation-detail ref="implementationDetail"></implementation-detail>
    <!-- 填写整改措施/风险 -->
    <implementation-fill-index ref="implementationFillIndex"></implementation-fill-index>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import implementationDetail from "../components/implementationDetail";
import implementationFillIndex from "../components/implementationFillIndex";
export default {
  components: { implementationDetail, implementationFillIndex },
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
        aa: i,
        bb: "4.8测试1整改通知单",
        cc: "2020-04-08 09:56:59.0",
        dd: i % 2 == 0 ? "风险措施确认通过" : "我已确认"
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
    },
    showDetail(row) {
      let _this = this.$refs.implementationDetail;
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