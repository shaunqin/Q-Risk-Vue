<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
      <el-tabs>
        <el-tab-pane label="风险评估填写">
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
              <el-table-column prop="ff" label="填报风险">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="writeRisk(scope.row)">填报风险</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="gg" label="制订整改措施" />
            </el-table>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="操作日志">
          <operation-log />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
       <!-- 查看问题 -->
    <problem-list ref="problemList" />
    <!-- 填报风险 -->
    <risk-input-form ref="riskInputForm" />
    </el-dialog>
  </div>
</template>

<script>
// import measureFill from "./measureFill";
import operationLog from "./operationLog";
import initData from "@/mixins/initData";
import problemList from "../../components/problemList";
import riskInputForm from './riskInputForm'
export default {
    components: { problemList,riskInputForm ,operationLog},
  mixins: [initData],
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
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
    doSubmit() {
      this.dialog = false;
    },
    showProblem(row) {
      let _this = this.$refs.problemList;
      _this.dialog = true;
    },
     writeRisk(row){
       let _this = this.$refs.riskInputForm;
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1100px;
  min-height: 70vh;
}
</style>