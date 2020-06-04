<template>
  <div>
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      style="width: 100%;"
    >
      <el-table-column prop="aa" label="检查项目" />
      <el-table-column prop="bb" label="检查条目" />
      <el-table-column prop="cc" label="严重等级">
        <template slot-scope="scope">
          <el-tag effect="dark" size="mini" type="success">{{scope.row.cc}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
export default {
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
        aa: "发动机自查1",
        bb: "2.是否在授权范围内工作？",
        cc: "2"
      },
      {
        aa: "发动机自查1",
        bb: "3.维修人员是否了解发动机放行要求？",
        cc: "2"
      },
      {
        aa: "发动机自查1",
        bb: "4.有无失控的印章?",
        cc: "2"
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
.rectification {
  margin-top: 20px;
}
/deep/ .el-table {
  th,
  td {
    text-align: left;
  }
}
</style>