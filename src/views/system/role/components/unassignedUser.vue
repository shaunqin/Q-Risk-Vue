<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="添加分配用户"
    custom-class="big_dialog"
    destroy-on-close
  >
    <div class="query-header">
      <el-form :model="queryForm" size="mini" inline>
        <el-form-item label="工号">
          <el-input v-model="queryForm.sqlUserId" placeholder="请输入工号" style="width:130px"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="queryForm.realname" placeholder="请输入姓名" style="width:130px"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="realname" label="员工名称" />
      <el-table-column prop="sqlUserId" label="工号" />
      <el-table-column prop="mobile" label="手机" />
      <el-table-column prop="mail" label="邮箱" />
      <el-table-column prop="isSysUser" label="系统用户">
        <template slot-scope="{row}">
          <span v-if="row.isSysUser=='1'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import initData from "@/mixins/initData";
import { setAssignUserByRoleId } from "@/api/role";
export default {
  mixins: [initData],
  data() {
    return {
      roleId: "",
      loading: false,
      dialog: false,
      queryForm: { sqlUserId: "", realname: "" },
      userIds: []
    };
  },
  methods: {
    beforeInit() {
      this.url = `/sys_mgr/role_mgr/query/role/${this.roleId}/unassigned_members/${this.page}/${this.size}`;
      return true;
    },
    toQuery() {
      this.page = 1;
      this.params = this.queryForm;
      this.init();
    },
    doSubmit() {
      if (this.userIds.length == 0) {
        this.$message("请选择要添加的用户");
        return;
      }
      setAssignUserByRoleId(this.roleId, this.userIds).then(res => {
        if (res.code == "200") {
          this.$message({ type: "success", message: "分配用户成功" });
          this.dialog = false;
          this.$parent.$parent.init();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    cancel() {
      this.dialog = false;
    },
    selectionChange(selection) {
      this.userIds = [];
      selection.map(item => {
        this.userIds.push(item.staffNo);
      });
      console.log(this.userIds);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>