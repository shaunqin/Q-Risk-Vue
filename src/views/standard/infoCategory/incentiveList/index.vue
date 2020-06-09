<template>
  <div class="dataSource">
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
      <el-table-column prop="aa" label="编号" />
      <el-table-column prop="bb" label="危险源" />
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
import {incentiveList} from '@/dataSource'
export default {
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
    this.data = incentiveList;
  },
  methods: {
    toQuery(name) {
      this.$message("功能正在创建中");
      // if (!name) {
      //   this.page = 1;
      //   this.init();
      //   return;
      // }
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
