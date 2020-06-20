<template>
  <el-dialog
    :title="title"
    :append-to-body="true"
    :close-on-click-modal="false"
    :visible.sync="dialog"
    custom-class="big_dialog"
  >
    <el-form :model="form">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="主题">
            <el-input v-model="form.aa" placeholder></el-input>
          </el-form-item>
          <el-form-item label="背景">
            <el-input v-model="form.bb" placeholder type="textarea" rows="2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="安全风险">
            <el-input v-model="form.cc" placeholder type="textarea" rows="2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-table :data="data" size="small" style="width: 100%;">
            <el-table-column label="责任单位" prop="aa" />
            <el-table-column label="风险防范" prop="bb" />
            <el-table-column label="反馈内容">
              <template slot-scope="scope">
                <el-input v-model="scope.row.cc" placeholder="反馈内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="updata(scope.row)">上传</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">关闭</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import initData from "@/mixins/initData";
export default {
  mixins: [initData],
  data() {
    return {
      title: "",
      dialog: false,
      form: {
        aa: "",
        bb: "",
        cc: "",
        dd: ""
      },
      shenpi: "",
      xiafa: ""
    };
  },
  methods: {
    updata(row) {},
    cancel() {
      this.dialog = false;
    },
    submit() {
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>