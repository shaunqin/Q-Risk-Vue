<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
      <el-tabs>
        <el-tab-pane label="详情">
          <implementation-info />
        </el-tab-pane>
        <el-tab-pane label="确认流程">
          <confirm-process></confirm-process>
        </el-tab-pane>
        <el-tab-pane label="操作日志">
          <operation-log></operation-log>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import implementationInfo from "./implementationInfo";
import confirmProcess from "./confirmProcess";
import operationLog from "./operationLog";
export default {
  components: { implementationInfo, confirmProcess, operationLog },
  data() {
    return {
      dialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1100px;
  min-height: 70vh;
}
</style>