<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
    >
      <el-table-column prop="aa" label="整改通知单编号" />
      <el-table-column prop="bb" label="名称" />
      <el-table-column prop="cc" label="生成时间" />
      <el-table-column prop="dd" label="创建人" />
      <el-table-column prop="ee" label="分发状态" />
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!-- <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    /> -->
  </div>
</template>

<script>
import initData from "@/mixins/initData";
export default {
  mixins: [initData],
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "RE20200527898",
        bb: "退回测试整改通知单",
        cc: "2020-05-27 15:46:30.0",
        dd: "徐京超",
        ee: "已分发"
      }
    ];
  },
  methods: {
    detail(row) {
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>