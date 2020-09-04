<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
  >
    <el-form ref="form" :model="form" :rules="formRules" size="small" label-width="70px">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="名称" prop="setName">
            <el-input v-model="form.setName" placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编号" prop="setObjectName">
            <el-input v-model="form.setObjectName" placeholder="请输入编号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-input-number v-model="form.type" placeholder></el-input-number>
      </el-form-item>
      <el-form-item label="默认部门" v-if="form.type==1">
        <department
          :value="dept"
          @change="deptChange"
          :multiple="true"
          :flat="true"
          style="line-height:20px"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/setting";
import department from "@/components/Department";

export default {
  components: { department },
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
        remark: "",
        setName: "",
        setObjectName: "",
        setValue: "",
        type: 1, // 1:部门设置
        setValue: "",
      },
      // dept: [],
      formRules: {
        setName: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        setObjectName: [
          {
            required: true,
            message: "编号不能为空",
            trigger: "blur",
          },
        ],
      },
      entArr: [],
    };
  },
  computed: {
    dept: {
      get() {
        return this.form.setValue == "" ? [] : this.form.setValue.split(",");
      },
      set(val) {
        this.form.setValue = val.join(",");
      },
    },
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
        remark: "",
        setName: "",
        setObjectName: "",
        setValue: "",
        type: 1, // 1:部门设置
        setValue: "",
      };
      this.dept = [];
    },
    deptChange(val) {
      this.dept = val;
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
