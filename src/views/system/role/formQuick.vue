<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="快速添加"
    custom-class="common_dialog"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="70px">
      <el-form-item label="部门">
        <department :value="form.deptPath" @change="change" style="width:100%;" />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-select v-model="selectedRoles" :multiple="true" clearable style="width:100%;">
          <el-option
            v-for="item in rolesList"
            :key="item.code"
            :label="item.roleDesc"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { quickAdd, queryCodeAndDesc } from "@/api/role";
import department from "@/components/Department";
export default {
  components: { department },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        deptPath: null,
        roles: []
      },
      rules: {
        funcDesc: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      entArr: [],
      rolesList: [],
      selectedRoles: []
    };
  },
  watch: {
    selectedRoles(val) {
      if (val && val.length > 0) {
        this.form.roles = this.rolesList.filter(r => this.selectedRoles.includes(r.code));
      } else {
        this.form.roles = [];
      }
    }
  },
  created() {
    queryCodeAndDesc().then(res => {
      if (res.code != '200') {
        this.$message.error(res.msg);
      } else {
        this.rolesList = res.obj;
      }
    })
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.loading = true;
          quickAdd(this.form).then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.resetForm();
              this.loading = false;
              this.$parent.init();
            } else {
              this.$message.error(res.msg);
              this.loading = false;
            }
          }).catch((err) => {
            console.log(err);
            this.loading = false;
          });
        }
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        deptPath: null,
        roles: []
      };
    },
    change(val) {
      this.form.deptPath = val;
    },
  },
};
</script>

<style scoped>
</style>
