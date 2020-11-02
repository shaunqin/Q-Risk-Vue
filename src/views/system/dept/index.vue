<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" />
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
        @click="add()"
      >新增</el-button>
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
      row-key="key"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :expand-row-keys="['000003']"
    >
      >
      <el-table-column label="部门名称" align="left">
        <template slot-scope="{row}">
          <span v-if="row.children&&row.children.length==0" style="margin-left: -22px">{{row.name}}</span>
          <span v-else>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门名称(英文名)">
        <template slot-scope="{row}">{{row.externMap.departmentNameEn}}</template>
      </el-table-column>
      <el-table-column label="操作" width="230px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-plus"
            @click="add(scope.row)"
          ></el-button>
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)" />
          <el-button
            slot="reference"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="subDelete(scope.row.value)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { format } from "@/utils/datetime";
import eform from "./form";
import { deleteDept, getDeptTree, queryParentDept } from "@/api/dept";

export default {
  name: "Role",
  components: { eform },
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
      queryForm: {},
      query: "",
      data: [],
      loading: true,
      isAdd: true
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeRouteLeave: function (to, from, next) {
    if (to.path === this.toPath) {
      return;
    }
    const _this = this.$refs.form;
    _this.dialog = false;
    next();
  },
  methods: {
    format,
    init() {
      this.loading = true;
      getDeptTree(this.queryForm).then(res => {
        this.data = res.obj;
        this.loading = false;
      });
    },
    subDelete(id) {
      this.delLoading = true;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteDept(id)
          .then(res => {
            if (res.code === "200") {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.delLoading = false;
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
    add(row) {
      this.isAdd = true;
      const _this = this.$refs.form;
      _this.dialog = true;
      if (row) {
        _this.form.parentCode = row.key;
      } else {
        _this.disabled = false;
      }
    },
    edit(row) {
      this.isAdd = false;
      const _this = this.$refs.form;
      queryParentDept(row.value).then(res => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          _this.form = {
            departmentId: row.value,
            departmentNameCn: row.name,
            departmentNameEn: row.externMap.departmentNameEn,
            parentCode: !!res.obj ? res.obj.departmentPath : null
          };
          _this.dialog = true;
        }
      });
    },
    // 选择切换
    selectionChange: function (selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    toQuery(name) {
      if (!name) this.queryForm = {};
      else this.queryForm = { departmentNameCn: name };
      this.page = 1;
      this.init();
    }
  }
};
</script>

<style lang="scss" scope>
.el-table--border td:first-child .cell {
  padding-left: 40px;
}
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
</style>
