<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    custom-class="big_dialog"
  >
    <el-form :model="form">
      <el-form-item label="选择部门">
        <el-select v-model="form.aa" placeholder="选择部门">
          <el-option :label="'选择部门'" :value="'选择部门'"></el-option>
        </el-select>
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
      form: {
        aa: "",
        bb: ""
      }
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