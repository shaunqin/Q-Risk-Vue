<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    custom-class="big_dialog"
    title="审批"
  >
    <el-card header="详情">
      <el-form ref="form" :model="form"  size="small" label-width="auto">
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
      <el-card header="审批记录" style="margin-top:20px">
      <el-table :data="ApprovalData" size="mini">
        <el-table-column type="index" />
        <el-table-column label="审批人" prop="aa" />
        <el-table-column label="审批结果" prop="bb" />
        <el-table-column label="审批时间" prop="cc" />
        <el-table-column label="备注" prop="dd" />
      </el-table>
    </el-card>
    <el-card header="审批" style="margin-top:20px">
      <el-form label-width="auto"  size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item label="审批">
              <el-radio-group v-model="approval">
                <el-radio label="1">通过</el-radio>
                <el-radio label="0">不通过</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="approval=='0'">
            <el-form-item label="原因">
              <el-input  placeholder="不同意原因" type="textarea" rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
      approval: "1",
      form: {}
    };
  },
  created () {
     this.ApprovalData = [
      {
        aa: "admin",
        bb: "通过",
        cc: "2020-05-04",
        dd: "审批原因"
      },
      {
        aa: "custom",
        bb: "不通过",
        cc: "2020-05-04",
        dd: "审批原因"
      },
      {
        aa: "admin",
        bb: "通过",
        cc: "2020-05-04",
        dd: "审批原因"
      }
    ];
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