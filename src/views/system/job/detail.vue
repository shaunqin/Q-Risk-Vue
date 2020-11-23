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
          <el-form-item label="任务编号">{{form.jobId}}</el-form-item>
          <el-form-item label="任务名称">{{form.jobName}}</el-form-item>
          <el-form-item label="cron表达式">{{form.cronExpression}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务分组">{{form.jobGroup}}</el-form-item>
          <el-form-item label="创建时间">{{format(form.createTime)}}</el-form-item>
          <el-form-item label="下次执行时间">{{format(form.nextValidTime)}}</el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调用目标方法" prop="invokeTarget">{{form.invokeTarget}}</el-form-item>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="任务状态">{{form.status==0?'正常':'暂停'}}</el-form-item>
          <el-form-item label="错误策略">
            <span v-if="form.misfirePolicy==1">立即执行</span>
            <span v-if="form.misfirePolicy==2">执行一次</span>
            <span v-if="form.misfirePolicy==3">放弃执行</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否并发">{{form.concurrent==0?'允许':'禁止'}}</el-form-item>
        </el-col>
      </el-row>
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
  created() {},
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
