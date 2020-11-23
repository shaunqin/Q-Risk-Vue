<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialog"
      custom-class="big_dialog"
      class="inner-dialog"
    >
      <el-form ref="form" :model="form">
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="责任人(HELDUSER)">
              <el-input v-model="form.aa" placeholder="请输入责任人"></el-input>
            </el-form-item>
            <el-form-item label="责任部门类型(Type of Responsible Department)*">
                <el-radio-group v-model="form.cc">
                  <el-radio label="1">生产</el-radio>
                  <el-radio label="2">支持</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最终责任部门(responsible department)">
              <el-select v-model="form.bb" style="width:100%">
                <el-option label="NewAmeco" value="NewAmeco"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型(System)">
              <el-select v-model="form.dd" style="width:100%">
                <el-option label="航线维护" value="航线维护"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
export default {
  mixins: [initData],
  data() {
    return {
      dialog: false,
      loading: false,
      form: {
        aa: "",
        bb: "",
        cc: "",
        dd: ""
      }
    };
  },
  mounted() {
    this.loading = false;
    this.data = [
      {
        aa: "问题描述",
        bb: "234234234"
      },
      {
        aa: "问题等级",
        bb: "1"
      },
      {
        aa: "责任部门",
        bb: "三方维修大队"
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
.inner-dialog {
  background: rgba(0, 0, 0, 0.5);
}
/deep/ .big_dialog {
    width: 1000px;
  min-height: 70vh;
}
</style>