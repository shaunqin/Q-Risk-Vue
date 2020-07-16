<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    custom-class="big_dialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="100px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="编号" prop="standardNo">
            <el-input v-model="form.standardNo" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="是否启用">
            <el-radio-group v-model="form.enable">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label>
            <eupload @success="uploadSuccess"></eupload>
          </el-form-item>
          <el-form-item label>
            <el-table :data="files" size="mini">
              <el-table-column label="文件名" prop="originFileName" />
              <el-table-column label="文件大小">
                <template slot-scope="{row}">{{(row.fileSize/1024).toFixed(2)}}Kb</template>
              </el-table-column>
              <el-table-column label="操作" width="100px">
                <template slot-scope="{row,$index}">
                  <el-tooltip content="预览" placement="left">
                    <el-link type="primary" :underline="false" :href="row.url" target="_blank">
                      <svg-icon icon-class="eye-open"></svg-icon>
                    </el-link>
                  </el-tooltip>&nbsp;&nbsp;
                  <el-button type="text" icon="el-icon-delete" @click="delFile($index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addOtherStand, modifyOtherStand } from "@/api/standard";
import eupload from "@/components/Upload/index";
export default {
  components: {
    eupload
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        standardNo: "",
        name: "",
        remark: "",
        enable: "",
        filesId: []
      },
      formRules: {
        standardNo: [
          { required: true, message: "请填写编号", trigger: "blur" }
        ],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }]
      },
      entArr: [],
      files: []
    };
  },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  created() {},
  watch: {
    files(val) {
      if (val && val.length > 0) this.form.filesId = val.map(r => r.id);
      else this.form.filesId = [];
    }
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.isAdd) {
            this.doAdd();
          } else this.doModify();
        }
      });
    },
    doAdd() {
      addOtherStand(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    doModify() {
      modifyOtherStand(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.resetForm();
            this.loading = false;
            this.$parent.init();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        standardNo: "",
        name: "",
        remark: "",
        enable: "",
        filesId: []
      };
      this.files = [];
    },
    uploadSuccess(response) {
      console.log(response);
      this.files.push(response.obj);
    },
    delFile(index) {
      this.files.splice(index, 1);
    }
  }
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
