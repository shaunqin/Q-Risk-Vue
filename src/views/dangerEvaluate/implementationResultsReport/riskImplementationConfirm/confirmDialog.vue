<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
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
          <el-table-column prop="ff" label="填报风险">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="showProblem(scope.row)">填报风险</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="gg" label="制订整改措施" />
        </el-table>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
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
      dialog: false,
      loading: false
    };
  },
  methods: {
    doSubmit() {
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1100px;
  min-height: 70vh;
}
.box-card {
  margin-bottom: 30px;
}
</style>