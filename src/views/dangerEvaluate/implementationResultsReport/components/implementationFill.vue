<template>
  <div>
    <task-detail></task-detail>
    <el-card class="box-card">
      <el-table
        v-loading="loading"
        :data="data"
        size="small"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%;"
      >
        <el-table-column prop="aa" label="整改通知单编号" />
        <el-table-column prop="bb" label="问题条目" />
        <el-table-column prop="cc" label="问题描述" />
        <el-table-column prop="dd" label="查看问题">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showProblem(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ee" label="是否现场整改" />
        <el-table-column prop="ff" label="填报风险" >
            <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="showProblem(scope.row)">填报风险</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="gg" label="制订整改措施" />
      </el-table>
    </el-card>
    <!-- 查看问题 -->
    <problem-list ref="problemList"></problem-list>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import taskDetail from "../../components/taskDetail";
import problemList from '../../components/problemList'
export default {
  components: { taskDetail,problemList },
  mixins: [initData],
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "",
        bb: "飞行、技术、客舱记录本是否在位",
        cc: "4.8测试1",
        dd: "华北航线中心",
        ee: "是 ( 不需要长期措施 )",
        ff: "",
        gg: ""
      }
    ];
  },
  methods: {
    showProblem(row) {
      let _this=this.$refs.problemList;
      _this.dialog=true;
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 30px;
}
</style>