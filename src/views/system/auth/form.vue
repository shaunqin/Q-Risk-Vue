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
      <el-form-item label="父级">
        <menu-tree-select :value="form.parentId" @change="parentChange" v-if="menuTreeReload"></menu-tree-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.isMenu">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-if="form.isMenu!=2">
        <icon-select :value="form.icon" @change="iconChange"></icon-select>
      </el-form-item>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="moduleDesc">
            <el-input v-model="form.moduleDesc" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="是否外链" v-if="form.isMenu!=2">
            <el-radio-group v-model="form.isFrame">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组件路径" v-if="form.isMenu==1">
            <el-input v-model="form.component" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="菜单状态">
            <el-radio-group v-model="form.enable">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" />
          </el-form-item>
          <el-form-item label="路由地址" prop="modulePath" v-if="form.isMenu!=2">
            <el-input v-model="form.modulePath" style="width: 100%;" />
          </el-form-item>
          <el-form-item label="权限标识" v-if="form.isMenu!=0">
            <el-input v-model="form.moduleCode" style="width: 100%;" />
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
import { add, modify } from "@/api/auth";
import department from "@/components/Department";
import menuTreeSelect from "@/components/MenuTreeSelect";
import iconSelect from "@/components/IconSelect/index";
export default {
  components: { department, menuTreeSelect, iconSelect },
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        isMenu: 0,
        icon: "",
        moduleDesc: "",
        isFrame: "",
        component: "",
        modulePath: "",
        orderNum: 0,
        parentId: "0",
        enable: "",
        moduleCode: "",
      },
      rules: {
        departmentNameCn: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
      },
      entArr: [],
      menuTreeReload: true,
    };
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
            this.loading = false;
            this.$parent.init();
            //刷新menutree
            this.menuTreeReload = false;
            this.$nextTick(() => {
              this.menuTreeReload = true;
            });
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
            //刷新menutree
            this.menuTreeReload = false;
            this.$nextTick(() => {
              this.menuTreeReload = true;
            });
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
        isMenu: 0,
        icon: "",
        moduleDesc: "",
        isFrame: "",
        component: "",
        modulePath: "",
        orderNum: 0,
        parentId: "0",
        enable: "",
        moduleCode: "",
      };
    },
    deptChange(val) {
      console.log(val);
    },
    parentChange(val) {
      this.form.parentId = val;
    },
    iconChange(val) {
      this.form.icon = val;
    },
  },
};
</script>

<style scoped>
</style>
