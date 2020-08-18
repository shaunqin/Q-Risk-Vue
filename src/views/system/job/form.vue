<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增任务' : '编辑任务'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="任务名称" prop="jobName">
            <el-input v-model="form.jobName" placeholder="请输入任务名称" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务分组">
            <el-select v-model="form.jobGroup" placeholder="请选择">
              <el-option label="默认" value="默认"></el-option>
              <el-option label="系统" value="系统"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="调用方法" prop="invokeTarget">
        <el-input v-model="form.invokeTarget" placeholder="请输入调用目标字符串"></el-input>
      </el-form-item>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="cron表达式" prop="cronExpression">
            <el-input v-model="form.cronExpression" placeholder="请输入cron执行表达式"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否并发">
            <el-radio-group v-model="form.concurrent">
              <el-radio-button label="0">允许</el-radio-button>
              <el-radio-button label="1">禁止</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="错误策略">
        <el-radio-group v-model="form.misfirePolicy">
          <el-radio-button label="1">立即执行</el-radio-button>
          <el-radio-button label="2">执行一次</el-radio-button>
          <el-radio-button label="3">放弃执行</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio label="0">正常</el-radio>
          <el-radio label="1">暂停</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/job";
import { re } from "@/utils/config-re";

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
  },
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
      roleSelect: [],
      formRules: {
        jobName: [
          { required: true, message: "任务名称不能为空", trigger: "blur" },
        ],
        invokeTarget: [
          {
            required: true,
            message: "调用目标字符串不能为空",
            trigger: "blur",
          },
        ],
        cronExpression: [
          {
            required: true,
            message: "cron执行表达式不能为空",
            trigger: "blur",
          },
        ],
      },
      entArr: [],
    };
  },
  created() {},
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      add(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.resetForm();
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    doModify() {
      modify(this.form)
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        jobName: "",
        jobGroup: "",
        invokeTarget: "",
        cronExpression: "",
        concurrent: "1",
        misfirePolicy: "1",
        status: "0",
      };
    },
  },
};
</script>

<style scoped>
</style>

<style lang="scss">
.roleSelect {
  width: 370px;
}
.el-select-dropdown {
  z-index: 99999999999999 !important;
}
</style>
