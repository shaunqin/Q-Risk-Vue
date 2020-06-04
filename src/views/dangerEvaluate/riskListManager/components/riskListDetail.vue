<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
      <el-tabs >
        <el-tab-pane label="任务详情">
          <task-info />
        </el-tab-pane>
        <el-tab-pane label="分发记录">
            <dispense-record />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import taskInfo from "./taskInfo";
import dispenseRecord from './dispenseRecord'
export default {
  components: { taskInfo,dispenseRecord },
  data() {
      return {
          dialog: false
      }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog{
  width: 1100px;
  min-height: 70vh;
}
</style>