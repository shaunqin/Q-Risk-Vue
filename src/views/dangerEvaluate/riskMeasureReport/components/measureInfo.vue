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
        <el-table-column prop="dd" label="责任部门" />
        <el-table-column prop="ee" label="查看风险">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="showRiskList(scope.row)">查看风险</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ff" label="是否 现场 整改" />
        <el-table-column prop="gg" label="整改措施">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="showRiskMeasure(scope.row)">查看整改措施</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 查看风险 -->
    <risk-dialog ref="riskDialog" :dataSource="dataSource"></risk-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import taskDetail from "../../components/taskDetail";
import riskDialog from "./riskDialog";
export default {
  components: { taskDetail, riskDialog },
  mixins: [initData],
  data() {
    return {
      dataSource: []
    };
  },
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
  },
  methods: {
    showRiskList(row) {
      this.dataSource = [
        {
          aa: "责任部门类型(Type of Responsible Department)",
          bb: "生产"
        }
      ];
      let _this = this.$refs.riskDialog;
      _this.dialog = true;
    },
    showRiskMeasure(row) {
      this.dataSource = [
        {
          aa: "产品类型(Product Type)",
          bb: "飞机定检/大修"
        }
      ];
      let _this = this.$refs.riskDialog;
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 30px;
}
</style>