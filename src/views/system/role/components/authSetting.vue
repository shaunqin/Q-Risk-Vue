<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="数据权限"
    custom-class="common_dialog"
    destroy-on-close
  >
    <el-scrollbar>
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="key"
        :props="{label:'name'}"
        :default-checked-keys="checkedKeys"
        :default-expanded-keys="checkedKeys"
      ></el-tree>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getMenuTree } from "@/api/auth";
import { setAuthByRoleId, queryRoleAuth } from "@/api/role";
export default {
  data() {
    return {
      roleId: "", //角色id
      loading: false,
      dialog: false,
      treeData: [],
      checkedKeys: []
    };
  },
  created() {
    this.getAuthTree();
  },
  watch: {
    roleId(val) {
      if (val) {
        queryRoleAuth(this.roleId).then(res => {
          this.checkedKeys = res.obj;
        });
      }
    }
  },
  methods: {
    doSubmit() {
      console.log(this.roleId);
      let selectedTreeKeys = this.$refs.tree.getCheckedKeys();
      console.log(selectedTreeKeys);
      setAuthByRoleId(this.roleId, selectedTreeKeys).then(res => {
        if (res.code == "200") {
          this.$message({
            type: "success",
            message: "设置成功"
          });
          this.dialog = false;
        } else {
          this.$message({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    cancel() {
      this.dialog = false;
      this.roleId = "";
      this.checkedKeys=[];
    },
    getAuthTree() {
      getMenuTree().then(res => {
        this.treeData = res.obj;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-scrollbar__wrap {
  height: 50vh;
}
</style>