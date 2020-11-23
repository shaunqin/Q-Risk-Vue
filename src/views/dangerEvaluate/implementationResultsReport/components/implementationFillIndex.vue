<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
      <el-tabs>
        <el-tab-pane label="整改措施填写">
          <implementation-fill />
        </el-tab-pane>
        <el-tab-pane label="操作日志">
          <operation-log></operation-log>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import implementationFill from "./implementationFill";
import operationLog from "./operationLog";
export default {
  components: { implementationFill, operationLog },
  data() {
    return {
      dialog: false,
      loading:false
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
</style>