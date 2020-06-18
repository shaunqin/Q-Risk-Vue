<template>
  <el-dialog title="详细" :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog">
    事项详细
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>