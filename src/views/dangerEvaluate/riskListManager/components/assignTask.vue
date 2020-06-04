<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
      title="分派任务"
    >
      <task-detail></task-detail>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>分发任务</span>
        </div>
        <el-form :model="form" label-width="auto" ref="form">
          <el-form-item label="分派方式">
            <el-radio-group v-model="form.aa">
              <el-radio label="1">分派到机构</el-radio>
              <el-radio label="2">分派到人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="label">
            <!-- <el-select multiple size="mini" style="width:80%" v-model="form.bb">
              <el-option label="丽川人" value="丽川人"></el-option>
              <el-option label="何瑞" value="何瑞"></el-option>
            </el-select>-->
            <person-tree></person-tree>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="doSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import taskDetail from "../../components/taskDetail";
import personTree from "@/components/common/personTree";
export default {
  components: { taskDetail, personTree },
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        aa: "1",
        bb: ""
      }
    };
  },
  computed: {
    label() {
      if (this.form.aa == 1) {
        return "分派单位";
      }
      return "分派到人";
    }
  },
  methods: {
    doSubmit() {
      this.$refs.form.validate(valid => {
        console.log(this.form);
        this.dialog = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .big_dialog {
  width: 1000px;
}
.box-card {
  margin-bottom: 30px;
}
</style>