<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" :data="parentIdList" />
    <div class="head-container">
      <el-input
        size="mini"
        v-model="query"
        clearable
        placeholder="请输入你要搜索的内容"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(query)"
      >搜索</el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-plus"
        @click="add('0')"
      >新增</el-button>
    </div>

    <!--表格渲染-->
    <div class="table">
      <el-table
        :data="data"
        style="width: 100%;margin-bottom: 20px;"
        row-key="key"
        border
        :expand-row-keys="expandRow"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="菜单名称" align="left">
          <template slot-scope="{row}">
            <span v-if="row.children.length==0" style="margin-left: -22px">{{row.name}}</span>
            <span v-else>{{row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="80">
          <template slot-scope="{row}">
            <svg-icon v-if="!!row.externMap.icon" :icon-class="row.externMap.icon"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="80">
          <template slot-scope="{row}">{{row.externMap.orderNum}}</template>
        </el-table-column>
        <el-table-column label="组件路径" align="left">
          <template slot-scope="{row}">{{row.externMap.component}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200px" align="right" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-plus" @click="add(scope.row.key)" />
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="subDelete(scope.row.key)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { del } from "@/api/auth";

import eform from "./form";

export default {
  components: { eform },
  mixins: [initData],
  data() {
    return {
      parentIdList: [],
      expandRow: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  watch: {
    data: {
      deep: true,
      handler(data) {
        this.expandRow = data.map(r => r.key);
      }
    }
  },
  methods: {
    toQuery(name) {
      if (!name) this.params = {};
      else this.params = { moduleDesc: name };
      this.page = 1;
      this.init();
    },
    beforeInit() {
      this.url = "/sys_mgr/module_mgr/query/tree";
      return true;
    },
    add(parentId) {
      this.isAdd = true;
      let _this = this.$refs.form;
      _this.form.parentId = parentId;
      _this.dialog = true;
    },
    // 编辑
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      _this.form = {
        id: row.key,
        isMenu: row.externMap.isMenu,
        icon: row.externMap.icon || "",
        moduleDesc: row.name,
        isFrame: row.externMap.isFrame,
        component: row.externMap.component,
        modulePath: row.value,
        orderNum: row.externMap.orderNum,
        parentId: row.externMap.parentId || "0",
        enable: row.externMap.enable,
        moduleCode: row.externMap.moduleCode,
      };
      _this.dialog = true;
    },
    subDelete(id) {
      this.delLoading = true;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del(id)
          .then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.delLoading = false;
              this.parentIdList = [];
              this.init();
              //刷新menutree
              let _this = this.$refs.form;
              _this.menuTreeReload = false;
              this.$nextTick(() => {
                _this.menuTreeReload = true;
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
            this.delLoading = false;
          });
      });
    },
  },
};
</script>

<style lang="scss" scope>
.head-container {
  margin-bottom: 20px;
}
.el-table--border td:first-child .cell {
  padding-left: 40px;
}
.roleSelect {
  width: 90%;
  margin-bottom: 20px;
}

.icon-save {
  position: absolute;
  right: 0;
}
</style>
