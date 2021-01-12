<template>
  <div class="app-container">
    <div class="head-container">
      <el-form class="query" size="mini" inline>
        <el-form-item label="标题">
          <el-input v-model="queryForm.title" placeholder></el-input>
        </el-form-item>
        <el-form-item label="发起人">
          <el-input v-model="queryForm.createBy" placeholder></el-input>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            style="width:220px"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="其他">
          <el-input v-model="queryForm.data" placeholder></el-input>
        </el-form-item>
        <el-form-item label="流程类型">
          <el-select v-model="queryForm.type" placeholder clearable>
            <el-option label="安全风险提示下发上报流程" value="1"></el-option>
            <el-option label="隐患排查下发上报流程" value="5"></el-option>
            <el-option label="专项风险评估流程下发上报流程" value="2"></el-option>
            <el-option label="月度风险评价流程下发上报流程" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="toQuery">查询</el-button>
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
      style="width: 100%"
    >
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="processName" label="流程类型" width="200" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="no" label="编号">
        <template slot-scope="{ row }">{{ row.no || "-" }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="createBy" label="发起人" />
      <el-table-column prop="data" label="其他" />

      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="detail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px; text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
    <edetail ref="edetail" />
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import { format } from "@/utils/datetime";
import { processDetail } from "@/api/process";
import edetail from './detail'
export default {
  components: { edetail },
  mixins: [initData],
  data() {
    return {
      queryForm: {
        createBy: "",
        startTime: "",
        endTime: "",
        data: "",
        type: "",
        title: ""
      },
      date: "",
    };
  },
  created() {
    this.init();
  },
  watch: {
    date(date) {
      if (date) {
        this.queryForm.startTime = date[0];
        this.queryForm.endTime = date[1];
      } else {
        this.queryForm.startTime = "";
        this.queryForm.endTime = "";
      }
    },
  },
  methods: {
    format,
    beforeInit() {
      this.url = `/process_mgr/query/pageList/${this.page}/${this.size}`;
      this.params = { ...this.queryForm };
      return true;
    },
    toQuery() {
      this.page = 1;
      this.init();
    },
    detail(row) {
      this.$loading();
      let _this = this.$refs.edetail;
      processDetail(row.businessId, row.businessType).then((res) => {
        this.$loading().close();
        if (res.code != '200') {
          this.$message.error(res.msg);
        } else {
          const { obj } = res;
          _this.data = { ...obj };
          _this.dialog = true;
        }
      }).catch(()=>{
        this.$loading().close();
      });
    },
  },
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
.query {
  .el-form-item {
    margin-bottom: 4px;
  }
}
</style>
