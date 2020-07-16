<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" />
    <div class="head-container">
      <search ref="search" />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(query)"
      >搜索</el-button>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%;"
      @selection-change="selectionChange"
    >
      <el-table-column type="index" width="80" :index="getIndex" />
      <el-table-column prop="deptNameCn" label="部门" />
      <el-table-column prop="roleDesc" label="角色名称" />
      <el-table-column prop="sn" label="排序" />
      <el-table-column label="操作" width="360px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-star-off"
            @click="authSetting(scope.row)"
          >数据权限</el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-user"
            @click="userSetting(scope.row)"
          >分配用户</el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row.id)" />
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.id)"
          />
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
    <!-- 数据权限 -->
    <auth-setting ref="authSetting"></auth-setting>
    <!-- 分配用户 -->
    <user-setting ref="userSetting"></user-setting>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { format } from "@/utils/datetime";
import eform from "./form";
import search from "./search";
import { del, query, detail } from "@/api/role";
import authSetting from "./components/authSetting";
import userSetting from "./components/userSetting";

export default {
  name: "Role",
  components: { eform, search, authSetting, userSetting },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      showBatchDelete: {
        // 是否显示操作组件
        type: Boolean,
        default: true
      },
      showOperation: {
        // 是否显示操作组件
        type: Boolean,
        default: true
      },
      selections: [], // 列表选中列
      queryForm: null
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeRouteLeave: function(to, from, next) {
    if (to.path === this.toPath) {
      return;
    }
    const _this = this.$refs.form;
    _this.dialog = false;
    next();
  },
  methods: {
    format,
    beforeInit() {
      this.url =
        "/sys_mgr/role_mgr/query/pageList/" + this.page + "/" + this.size;
      const sort = "id,desc";
      this.params = { page: this.page, size: this.size, sort: sort };
      if (this.queryForm != null) {
        this.params = { ...this.params, ...this.queryForm };
      }
      return true;
    },
    subDelete(id) {
      this.delLoading = true;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        del(id)
          .then(res => {
            if (res.code === "200") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.delLoading = false;
              this.dleChangePage();
              this.init();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.delLoading = false;
          });
      });
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(id) {
      this.isAdd = false;
      const _this = this.$refs.form;
      detail(id).then(res => {
        if (res.code === "200") {
          _this.form = {
            id: res.obj.id,
            roleDesc: res.obj.roleDesc,
            code: res.obj.code,
            sn: res.obj.sn,
            deptPath: res.obj.deptPath
          };
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    toQuery() {
      this.queryForm = this.$refs.search.queryForm;
      this.init();
    },
    authSetting(row) {
      const _this = this.$refs.authSetting;
      _this.roleId = row.id;
      _this.dialog = true;
    },
    userSetting(row) {
      const _this = this.$refs.userSetting;
      _this.roleId = row.id;
      _this.init();
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scope>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 70px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.demo-table-expand .el-form-item__content {
  font-size: 12px;
}
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
// .head-container {
//   margin-bottom: 20px;
// }
</style>
