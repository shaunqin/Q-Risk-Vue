<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="分配用户"
    custom-class="big_dialog"
    destroy-on-close
  >
    <div class="query-header">
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="add">分配用户</el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(userIds)">批量取消授权</el-button>
      <el-form :model="queryForm" size="mini" inline class="query-form">
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
      <el-table-column type="selection" width="50px"></el-table-column>
      <el-table-column prop="realname" label="员工名称" />
      <el-table-column prop="sqlUserId" label="用户名" />
      <el-table-column prop="mobile" label="手机" />
      <el-table-column prop="mail" label="邮箱" />
      <el-table-column prop="isSysUser" label="系统用户">
        <template slot-scope="{row}">
          <span v-if="row.isSysUser=='1'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="del([row.staffNo])"></el-button>
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
      <el-button type="primary" @click="cancel">关闭</el-button>
      <!-- <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button> -->
    </div>
    <!-- 分配用户 -->
    <unassigned-user ref="unassignedUser"></unassigned-user>
  </el-dialog>
</template>

<script>
import initData from "@/mixins/initData";
import unassignedUser from "./unassignedUser";
import { unassignByRoleId } from "@/api/role";
export default {
  mixins: [initData],
  components: { unassignedUser },
  data() {
    return {
      roleId: "",
      loading: false,
      dialog: false,
      userIds: [],
      queryForm: { sqlUserId: "", realname: "" }
    };
  },
  methods: {
    toQuery() {
      this.page = 1;
      this.params = this.queryForm;
      this.init();
    },
    beforeInit() {
      this.url = `/sys_mgr/role_mgr/query/role/${this.roleId}/members/${this.page}/${this.size}`;
      return true;
    },
    doSubmit() {},
    cancel() {
      this.dialog = false;
      this.page = 1;
    },
    add() {
      let _this = this.$refs.unassignedUser;
      _this.roleId = this.roleId;
      _this.init();
      _this.dialog = true;
    },
    selectionChange(selection) {
      this.userIds = [];
      selection.map(item => {
        this.userIds.push(item.staffNo);
      });
    },
    del(ids) {
      if (ids && ids.length == 0) {
        this.$message("请选择要取消授权的用户!");
        return;
      }
      this.$confirm("是否确认取消授权?", "提示", { type: "warning" }).then(
        () => {
          unassignByRoleId(this.roleId, ids).then(res => {
            if (res.code == "200") {
              this.$message({ type: "success", message: "取消授权成功" });
              this.dleChangePage();
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.query-header {
  margin-bottom: 10px;
  .query-form {
    display: inline;
    margin-left: 20px;
  }
}
</style>