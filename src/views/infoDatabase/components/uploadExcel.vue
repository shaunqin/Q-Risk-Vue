<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="导入"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="auto">
      <el-form-item label="附件上传">
        <eupload @success="uploadSuccess"></eupload>
      </el-form-item>
      <el-form-item label>
        <el-table :data="files" size="mini">
          <el-table-column label="文件名" prop="originFileName" />
          <el-table-column label="文件大小">
            <template slot-scope="{row}">{{(row.fileSize/1024).toFixed(2)}}Kb</template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import eupload from "@/components/Upload/index";
import { addByExcel } from "@/api/infodb";

export default {
  components: {
    eupload,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        filesId: [],
      },
      roleSelect: [],
      formRules: {},
      entArr: [],
      files: [],
    };
  },
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  created() {},
  computed: {
    uploadurl() {
      return (
        process.env.VUE_APP_BASE_API +
        "/infoDatabase_mgr/infoDatabase_mgr/addByExcel"
      );
    },
  },
  watch: {
    files(val) {
      if (val && val.length > 0) this.form.filesId = val.map((r) => r.id);
      else this.form.filesId = [];
    },
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      if (this.form.filesId.length == 0) {
        this.$message.error("请先上传Excel");
        return;
      }
      this.loading = true;
      this.form.type = this.type;
      addByExcel(this.form).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
          this.loading = false;
        } else {
          this.loading = false;
          this.$message.success(res.obj)
          this.$parent.init();
          this.resetForm();
        }
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        filesId: [],
      };
      this.files = [];
    },
    uploadSuccess(response) {
      console.log(response);
      this.files = [response.obj];
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
