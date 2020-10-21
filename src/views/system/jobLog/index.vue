<template>
  <div class="app-container log">
    <div class="head-container">
      <el-form ref="form" :model="queryForm" size="mini" inline>
        <el-form-item label="任务名称">
          <el-input v-model="queryForm.jobName" placeholder="请输入任务名称" style="width:130px"></el-input>
        </el-form-item>
        <el-form-item label="执行状态">
          <el-select v-model="queryForm.status" placeholder clearable style="width:100px">
            <el-option label="正常" value="0"></el-option>
            <el-option label="异常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button
            class="filter-item"
            size="mini"
            type="success"
            icon="el-icon-search"
            @click="toQuery"
          >搜索</el-button>
          <el-button class="filter-item" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            :disabled="selectId.length==0"
            @click="subDelete"
          >删除</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="clean">清空</el-button>
        </el-form-item>
      </el-form>
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
      <el-table-column prop="jobLogId" label="日志编号" width="80" />
      <el-table-column prop="jobName" label="任务名称" width="120" show-overflow-tooltip />
      <el-table-column prop="jobGroup" label="任务组名" />
      <el-table-column prop="invokeTarget" label="调用目标字符串" width="190" show-overflow-tooltip />
      <el-table-column prop="jobMessage" label="日志信息" width="150" show-overflow-tooltip />
      <el-table-column label="执行状态">
        <template slot-scope="{row}">
          <span v-if="row.status=='0'">正常</span>
          <span v-else>异常</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时间">
        <template slot-scope="{row}">{{format(row.createTime)}}</template>
      </el-table-column>

      <el-table-column label="操作" width="100px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-view"
            size="mini"
            @click="detail(scope.row.jobLogId)"
          >详细</el-button>
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
    <edetail ref="detail" />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { format } from "@/utils/datetime";
import { detailLog, delLog, cleanLog } from "@/api/job";
import edetail from './detail'
export default {
  name: "job",
  components: { edetail },
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      selectId: [], // 列表选中列
      queryForm: {
        jobName: "",
        status: ""
      },
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    format,
    beforeInit() {
      this.url = "/sys_mgr/job_log/query/pageList/" + this.page + "/" + this.size;
      this.params = { ...this.queryForm };
      return true;
    },
    subDelete() {
      let ids = this.selectId.join(',');
      this.delLoading = true;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delLog(ids)
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
    clean() {
      this.delLoading = true;
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        cleanLog()
          .then((res) => {
            if (res.code === "200") {
              this.$message({
                message: "清空成功",
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
      this.queryForm = {
        jobName: "",
        status: ""
      };
      this.init();
    },
    detail(jobId) {
      const _this = this.$refs.detail;
      detailLog(jobId).then((res) => {
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
        arr.push(item.jobLogId);
      });
      this.selectId = arr;
    },
    toQuery() {
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
.log .head-container {
  margin-bottom: 0 !important;
}
</style>
