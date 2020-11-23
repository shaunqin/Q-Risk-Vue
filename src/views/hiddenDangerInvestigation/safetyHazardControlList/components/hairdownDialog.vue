<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    custom-class="big_dialog"
    title="下发"
  >
    <el-card header="详情">
      <el-form ref="form" :model="form" size="small" label-width="auto">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="名称" prop="aa">
              <el-input v-model="form.aa" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="隐患风险" prop="bb">
              <el-input v-model="form.bb" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="隐患等级">
              <el-input v-model="form.cc" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="风险描述">
              <el-input v-model="form.dd" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险等级">
              <el-input v-model="form.ee" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="发现时间">
              <el-input v-model="form.ff" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="来源">
              <el-input v-model="form.gg" style="width: 100%;" />
            </el-form-item>
            <el-form-item label="整改进展">
              <el-input v-model="form.hh" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card header="下发" style="margin-top:20px">
      <el-form label-width="auto" size="small">
        <el-form-item label="选择部门">
          <el-select v-model="bumen" placeholder="选择部门">
            <el-option :label="'选择部门'" :value="'选择部门'"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
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
      },
      bumen:""
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