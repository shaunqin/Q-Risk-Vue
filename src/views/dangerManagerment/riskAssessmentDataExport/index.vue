<template>
  <div class="app-container">
    <eform ref="form" :is-add="isAdd"></eform>
    <chart ref="chart"></chart>
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
      <el-table-column prop="aa" label="分类一编号" width="110" />
      <el-table-column prop="bb" label="分类二编号" width="110" />
      <el-table-column prop="cc" label="危险源" />
      <el-table-column prop="dd" label="危险源关联的次数" width="150" />
      <el-table-column prop="ee" label="危险源关联事件的次数" width="180" />
      <el-table-column prop="ff" label="危险源关联安全信息的次数" width="200" />
      <el-table-column prop="gg" label="条件概率" />
      <el-table-column prop="hh" label="可能性" />
      <el-table-column prop="ii" label="可能性等级" width="110" />
      <el-table-column prop="jj" label="可能性量化分值" width="120" />
      <el-table-column label="计算公式" width="150px">
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.jj" style="width:100px">
            <el-option label="aa" value="aa"></el-option>
            <el-option label="bb" value="bb"></el-option>
          </el-select>
          <el-button size="mini" type="text" @click="preDesign(scope.row)">预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160px" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-view"
              @click="showChart(scope.row)"
            />
            <el-button
              :disabled="scope.row.userName !== userInfo.userName"
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="subDelete(scope.row.id)"
            />
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
    <!-- 计算公式 -->
    <model-design ref="modelDesign"></model-design>
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import eform from "./form";
import chart from "./chart";
import modelDesign from "../modelDesign/form";
export default {
  components: { eform, chart, modelDesign },
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
        aa: "测试",
        bb: "测试",
        cc: "测试",
        dd: "测试",
        ee: "测试",
        ff: "测试",
        gg: "测试",
        hh: "测试",
        ii: "测试",
        jj: "测试"
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
    showChart(row) {
      let _this = this.$refs.chart;
      _this.dialog = true;
    },
    preDesign(row) {
      let _this = this.$refs.modelDesign;
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
