<template>
  <div>
    <el-dialog
      title="分析图"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
    >
      <img src="@/assets/images/chart.png" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
