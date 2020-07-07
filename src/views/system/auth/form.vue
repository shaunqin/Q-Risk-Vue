<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增功能' : '编辑功能'"
    custom-class="common_dialog"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="auto">
      <el-form-item label="父级" v-if="!!form.parentId">
        <el-select disabled v-model="form.parentId" placeholder="请选择" class="select">
          <el-option v-for="item in data" :key="item.key" :label="item.name" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.isMenu">
          <el-radio label="0">目录</el-radio>
          <el-radio label="1">菜单</el-radio>
          <el-radio label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单代号" prop="moduleCode">
        <el-input v-model="form.moduleCode" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="菜单描述(名称)" prop="moduleDesc">
        <el-input v-model="form.moduleDesc" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="菜单路径" prop="modulePath">
        <el-input v-model="form.modulePath" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="菜单排序" prop="modulePath">
        <el-input-number v-model="form.orderNum" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, modify } from "@/api/auth";
import department from "@/components/Department";
export default {
  components: { department },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        isMenu: "",
        moduleCode: "",
        moduleDesc: "",
        modulePath: "",
        orderNum: "",
        parentId: 0
      },
      rules: {
        departmentNameCn: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      },
      entArr: [],
      name: ""
    };
  },
  created() {},
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
      add(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message.error(res.msg);
          }
          this.resetForm();
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    doModify() {
      modify(this.form)
        .then(res => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message.error(res.msg);
          }
          this.resetForm();
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        isMenu: "",
        moduleCode: "",
        moduleDesc: "",
        modulePath: "",
        orderNum: "",
        parentId: 0
      };
    },
    deptChange(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped>
</style>
