<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd" />
    <edetail ref="detail" />

    <div class="head-container">
      <search ref="search" />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
      <el-button class="filter-item" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
      <br />
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button
        type="success"
        size="mini"
        icon="el-icon-edit"
        :disabled="selectId.length!=1"
        @click="edit"
      >修改</el-button>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-delete"
        :disabled="selectId.length!=1"
        @click="subDelete"
      >删除</el-button>
      <el-button type="info" size="mini" icon="el-icon-s-operation" @click="log">日志</el-button>
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
      <el-table-column prop="jobId" label="任务编号" />
      <el-table-column prop="jobName" label="任务名称" />
      <el-table-column prop="jobGroup" label="任务组名" />
      <el-table-column prop="invokeTarget" label="调用目标字符串" width="190" show-overflow-tooltip />
      <el-table-column prop="cronExpression" label="cron执行表达式" />
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.status"
            active-value="0"
            inactive-value="1"
            @change="changeStatus($event,row.jobId)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-caret-right"
            @click="runOnce(scope.row.jobId)"
          >执行一次</el-button>
          <el-button type="text" icon="el-icon-view" size="mini" @click="detail(scope.row.jobId)">详细</el-button>
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
    <log ref="log" />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { format } from "@/utils/datetime";
import eform from "./form";
import edetail from "./detail";
import { del, detail, modifyStatus, run } from "@/api/job";
import search from "./search";
import log from './log'
export default {
  name: "job",
  components: { eform, search, edetail, log },
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
      this.url = "/sys_mgr/job/query/pageList/" + this.page + "/" + this.size;
      if (this.queryForm != null) {
        this.params = { ...this.queryForm };
      }
      return true;
    },
    subDelete() {
      let id = this.selectId[0];
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
    edit() {
      this.isAdd = false;
      const _this = this.$refs.form;
      let id = this.selectId[0];
      detail(id).then((res) => {
        if (res.code === "200") {
          _this.form = {
            jobId: res.obj.jobId,
            jobName: res.obj.jobName,
            jobGroup: res.obj.jobGroup,
            invokeTarget: res.obj.invokeTarget,
            cronExpression: res.obj.cronExpression,
            concurrent: res.obj.concurrent,
            misfirePolicy: res.obj.misfirePolicy,
            status: res.obj.status,
          };
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    detail(jobId) {
      const _this = this.$refs.detail;
      detail(jobId).then((res) => {
        if (res.code === "200") {
          _this.form = res.obj;
          _this.dialog = true;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 选择切换
    selectionChange: function (selections) {
      let arr = [];
      selections.map((item) => {
        arr.push(item.jobId);
      });
      this.selectId = arr;
    },
    toQuery() {
      let _this = this.$refs.search;
      this.queryForm = _this.queryForm;
      this.page = 1;
      this.init();
    },
    changeStatus(val, jobId) {
      let editForm = { jobId, status: val };
      modifyStatus(editForm).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.$message.success("设置成功");
        }
        this.init();
      });
    },
    runOnce(jobId) {
      run(jobId).then((res) => {
        if (res.code != "200") {
          this.$message.error(res.msg);
        } else {
          this.$message.success("执行成功");
          this.init();
        }
      });
    },
    log() {
      let _this = this.$refs.log;
      _this.dialog = true;
    }
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
