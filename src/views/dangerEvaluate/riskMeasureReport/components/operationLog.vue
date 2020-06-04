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
      <el-table-column type="index" width="50px" />
      <el-table-column prop="aa" label="措施编号" />
      <el-table-column prop="bb" label="操作人" />
      <el-table-column prop="cc" label="操作时间" />
      <el-table-column prop="dd" label="措施状态" />
      <el-table-column prop="ee" label="整改状态" />
      <el-table-column prop="ff" label="意见" />
    </el-table>
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
        aa: "",
        bb: "",
        cc: "4.8测试1",
        dd: "华北航线中心",
        ee: "",
        ff: "否 ()",
        gg: ""
      }
    ];
  }
};
</script>

<style lang="scss" scoped>
</style>