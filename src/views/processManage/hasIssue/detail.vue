<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="详情"
    custom-class="big_dialog"
  >
    <safeNoticeProcess key="safeNoticeProcess" v-if="processType=='1'" :data="data" />
    <hiddenDangeProcess key="hiddenDangeProcess" v-if="processType=='5'" :data="data" />
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <!-- <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import safeNoticeProcess from './components/safeNoticeProcess'
import hiddenDangeProcess from './components/hiddenDangeProcess'
export default {
  components: {
    safeNoticeProcess, hiddenDangeProcess
  },
  data() {
    return {
      dialog: false,
      loading: false,
      data: {},
    }
  },
  computed: {
    processType() {
      return this.data.type
    }
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.resetForm();
    },
    resetForm() {
      this.dialog = false;
    }
  },
}
</script>

<style lang="scss" scoped>
</style>