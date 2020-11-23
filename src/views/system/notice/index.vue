<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" />
    <div class="head-container">
      <el-input v-model="query" placeholder="请输入标题" size="mini" style="width:200px;"></el-input>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(query)"
      >搜索</el-button>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-delete"
        :disabled="selectId.length!=1"
        @click="subDelete"
      >删除</el-button>
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
      <el-table-column type="selection" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="content" label="内容" width="200" show-overflow-tooltip />
      <el-table-column prop="creater" label="创建人" />
      <el-table-column prop="createTime" label="创建时间">
        <template slot-scope="{row}">{{format(row.createTime)}}</template>
      </el-table-column>

      <el-table-column label="操作" width="80px" align="center" fixed="right">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(row.id)"></el-button>
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
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { format } from "@/utils/datetime";
import eform from "./form";
import { del, detail } from "@/api/notice";
export default {
  name: "notice",
  components: { eform },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      selectId: [], // 列表选中列
      queryForm: null,
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
    beforeInit() {
      this.url = `/sys_mgr/announcement_mgr/query/pageList/${this.page}/${this.size}`;
      if (this.queryForm != null) {
        this.params = { ...this.queryForm };
      }
      return true;
    },
    // 选择切换
    selectionChange: function (selections) {
      let arr = [];
      selections.map((item) => {
        arr.push(item.id);
      });
      this.selectId = arr;
    },
    subDelete() {
      this.delLoading = true;
      let ids = this.selectId;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        del(ids)
          .then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.delLoading = false;
              this.dleChangePage();
              this.init();
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
    refresh() {
      let _this = this.$refs.search;
      _this.$refs.form.resetFields();
      _this.queryForm = { jobName: "", jobGroup: "", status: "" };
      this.queryForm = _this.queryForm;
      this.init();
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(id) {
      this.isAdd = false;
      const _this = this.$refs.form;
      detail(id).then((res) => {
        if (res.code === "200") {
          _this.form = {
            id: res.obj.id,
            title: res.obj.title,
            content: res.obj.content,
          };
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    toQuery(name) {
      this.queryForm = { title: name };
      this.page = 1;
      this.init();
    },
  },
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
.head-container {
  margin-bottom: 20px;
}
</style>
