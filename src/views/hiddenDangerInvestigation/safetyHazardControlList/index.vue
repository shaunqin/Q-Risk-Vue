<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
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
      <el-table-column type="index" width="50" />
      <el-table-column prop="jj" label="编号" />
      <el-table-column prop="aa" label="名称" />
      <el-table-column prop="bb" label="发生时间" />
      <el-table-column prop="cc" label="隐患风险" />
      <el-table-column prop="dd" label="隐患等级" />
      <el-table-column prop="ee" label="风险描述" />
      <el-table-column prop="ff" label="风险等级" />
      <el-table-column prop="gg" label="发现时间" />
      <el-table-column prop="hh" label="来源" />
      <el-table-column prop="ii" label="整改进展" />
      <el-table-column label="操作" width="230px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" @click="hairdown(scope.row)">下发</el-button>
            <el-button size="mini" @click="approval(scope.row)">审批</el-button>
            <el-button size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <el-button size="mini" icon="el-icon-delete" @click="subDelete(scope.row.id)"></el-button>
          </el-button-group>
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
    <!-- 驳回 -->
    <reject-dialog ref="rejectDialog"></reject-dialog>
    <!-- 下发 -->
    <hairdown-dialog ref="hairdownDialog"></hairdown-dialog>
    <!-- 审批 -->
    <approval-dialog ref="approvalDialog"></approval-dialog>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import eform from "./form";
import rejectDialog from "./components/rejectDialog";
import hairdownDialog from "./components/hairdownDialog";
import approvalDialog from "./components/approvalDialog";
export default {
  components: { eform,hairdownDialog,approvalDialog,rejectDialog },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: []
    };
  },
  mounted() {
    this.loading = false;
    for (let i = 0; i < 5; i++) {
      this.data.push({
        aa: "隐患-"+i,
        bb: "20200602",
        cc: "起落架隐患",
        dd: "三级",
        ee: "起落架异常",
        ff: "1级",
        gg: "20200602",
        hh: "安全检查",
        ii:"整改中",
        jj:"YP202005050"+i
      });
    }
  },
  methods: {
    toQuery(name) {
      if (!name) {
        this.page = 1;
        this.init();
        return;
      }
    },
    // 选择切换
    selectionChange: function(selections) {
      this.selections = selections;
      this.$emit("selectionChange", { selections: selections });
    },
    add() {
      this.isAdd = true;
      this.$refs.form.dialog = true;
    },
    edit(row) {
      this.isAdd = false;
      let _this = this.$refs.form;
      _this.form = Object.assign({}, row);
      _this.dialog = true;
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    reject(row){
      let _this = this.$refs.rejectDialog;
      _this.form = Object.assign({}, row);
      _this.dialog = true;
    },
    hairdown(row){
      let _this = this.$refs.hairdownDialog;
       _this.form = Object.assign({}, row);
      _this.dialog = true;
    },
    approval(row){
       let _this = this.$refs.approvalDialog;
        _this.form = Object.assign({}, row);
      _this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-item {
  > .el-input__inner {
    height: 32px !important;
  }
}
.head-container {
  margin-bottom: 20px;
}
</style>