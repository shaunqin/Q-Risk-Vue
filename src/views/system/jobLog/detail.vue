<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="任务详细"
  >
    <el-form ref="form" :model="form" size="small" label-width="auto">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="日志编号">{{form.jobLogId}}</el-form-item>
          <el-form-item label="任务名称">{{form.jobName}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务分组">{{form.jobGroup}}</el-form-item>
          <el-form-item label="创建时间">{{format(form.createTime)}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调用方法" prop="invokeTarget">{{form.invokeTarget}}</el-form-item>
      <el-form-item label="日志信息">{{form.jobMessage}}</el-form-item>
      <el-form-item label="执行状态">{{form.status==0?'正常':'异常'}}</el-form-item>
      <el-form-item label="异常信息" v-if="form.status==1">
        <div style="white-space: pre-line;">{{form.exceptionInfo}}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { format } from "@/utils/datetime";

export default {
  props: {},
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        jobName: "",
        jobGroup: "",
        invokeTarget: "",
        cronExpression: "",
        concurrent: "1",
        misfirePolicy: "1",
        status: "0",
      },
    };
  },
  created() { },
  methods: {
    format,
    cancel() {
      this.resetForm();
    },
    resetForm() {
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
