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
      <el-table-column prop="aa" label="ID" />
      <el-table-column prop="bb" label="任务名称" />
      <el-table-column prop="cc" label="反馈次数" />
      <el-table-column prop="dd" label="转发部门" />
      <el-table-column prop="ee" label="转发人" />
      <el-table-column prop="ff" label="转发给(人)" width="140px" />
      <el-table-column prop="gg" label="转发给部门" width="120px" />
      <el-table-column prop="hh" label="转发时间" />
      <el-table-column prop="ii" label="已执行次数" width="130px" />
      <el-table-column label="操作" width="110px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="zhenggai(scope.row)">查看整改</el-button>
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
    <div v-if="rectification" class="rectification">
      <rectification-record></rectification-record>
    </div>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import rectificationRecord from "./rectificationRecord";
export default {
  components: { rectificationRecord },
  mixins: [initData],
  data() {
    return {
      rectification: false
    };
  },
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "2132",
        bb: "退回测试",
        cc: "0",
        dd: "成都分公司",
        ee: "胡子铮",
        ff: "徐京超(096645)",
        gg: "",
        hh: "2020-5-27",
        ii: "0"
      },
      {
        aa: "2132",
        bb: "退回测试",
        cc: "0",
        dd: "成都分公司",
        ee: "胡子铮",
        ff: "徐京超(096645)",
        gg: "",
        hh: "2020-5-27",
        ii: "0"
      }
    ];
  },
  methods: {
    zhenggai(row) {
      this.rectification = true;
      console.log(row);
    }
  }
};
</script>

<style lang="scss" scoped>
.rectification{
    margin-top: 20px;
}
/deep/ .el-table__fixed-right{
  height: 100% !important;
}
</style>