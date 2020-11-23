<template>
  <div class="container-body">
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
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >新建任务</el-button>
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
      <el-table-column prop="aa" label="编号" />
      <el-table-column prop="bb" label="任务名称" />
      <el-table-column prop="cc" label="发布时间" />
      <el-table-column prop="dd" label="单据类型" width="100" />
      <el-table-column prop="ee" label="任务类型" />
      <el-table-column prop="ff" label="分发状态" />
      <el-table-column label="操作" width="430px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger">撤回</el-button>
          <el-button size="mini" type="success" @click="assignTask(scope.row)">分派任务</el-button>
          <el-button size="mini" type="danger" @click="subDelete(scope.row.id)">删除</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
          <el-button size="mini" type="warning" @click="showDetail(scope.row)">查看任务详情</el-button>
          <!-- <el-button
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
          />-->
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
    <!-- 查看任务详情 -->
    <risk-list-detail ref="riskListDetail"></risk-list-detail>
    <!-- 分派任务 -->
    <assign-task ref="assignTask"></assign-task>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import riskListDetail from "../components/riskListDetail";
import assignTask from "../components/assignTask";
import eform from "./form";
export default {
  components: { eform, riskListDetail, assignTask },
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
        aa: "测试",
        bb: "测试",
        cc: "测试",
        dd: "测试",
        ee: "测试",
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
      let _this = this.$refs.riskListDetail;
      _this.dialog = true;
    },
    assignTask(row) {
      let _this = this.$refs.assignTask;
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