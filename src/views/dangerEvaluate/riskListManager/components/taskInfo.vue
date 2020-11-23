<template>
  <div>
    <task-detail></task-detail>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>操作记录</span>
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        size="small"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%;"
      >
        <el-table-column prop="aa" label="相关操作" />
        <el-table-column prop="bb" label="操作人" />
        <el-table-column prop="cc" label="操作时间" />
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
    </el-card>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import taskDetail from "../../components/taskDetail";
export default {
  components: { taskDetail },
  mixins: [initData],
  data() {
    return {
      key: ""
    };
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 30px;
}
</style>