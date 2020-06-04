<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
      class="inner-dialog"
    >
      <!--表格渲染-->
      <el-table
        v-loading="loading"
        :data="dataSource"
        size="small"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%;"
      >
        <el-table-column prop="aa" label="属性" />
        <el-table-column prop="bb" label="值" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
export default {
  mixins: [initData],
  props: {
      dataSource: {
          type: Array,
          default: []
      },
  },
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.inner-dialog {
  background: rgba(0, 0, 0, 0.5);
}
/deep/ .big_dialog {
  min-height: 70vh;
}
</style>