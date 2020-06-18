<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    custom-class="big_dialog"
  >
    <el-form :model="form">
      <el-form-item label="审批">
        <el-radio-group v-model="approval">
          <el-radio label="1">通过</el-radio>
          <el-radio label="0">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      loading: false,
      approval:"0",
      form:{}
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
</style>