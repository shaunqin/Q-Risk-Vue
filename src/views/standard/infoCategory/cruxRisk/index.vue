<template>
  <div class="dataSource">
    <eform ref="form" :is-add="isAdd" :roleOptions="[]"></eform>
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
      <el-table-column type="index" width="50" :index="getIndex" />
      <el-table-column prop="riskName" label="关键风险" width="150" />
      <el-table-column prop="riskNo" label="编号" width="120" />
      <el-table-column label="危险源" align="left">
        <template slot-scope="{row}">
          <span v-for="(item,index) in row.hazards" :key="item.diskNo" class="tb-span">
            {{item.diskNo}}
            <span v-if="index<row.hazards.length-1">,</span>
          </span>
          <el-popover placement="left" :width="600" trigger="hover">
            <span v-for="(item,index) in row.hazards" :key="item.diskNo" class="tb-span">
              {{item.diskName}}
              <span v-if="index<row.hazards.length-1">,</span>
            </span>
            <span slot="reference" class="el-icon-info"></span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!-- <el-pagination
      :total="total"
      :current-page="page"
      style="margin-top: 8px;text-align: right"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />-->
  </div>
</template>

<script>
import initData from "@/mixins/initData";
import eform from "./form";
export default {
  name: "dataSources",
  components: { eform },
  mixins: [initData],
  data() {
    return {
      isSuperAdmin: false,
      userInfo: {},
      selections: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    beforeInit() {
      // this.url = `/info_mgr/riskList_mgr/query/criticalRisk/pageList/${this.page}/${this.size}`;
      this.url = `/info_mgr/riskList_mgr/query/criticalRisk`;
      return true;
    },
    toQuery(name) {
      this.page = 1;
      if (!name) this.params = {};
      else this.params = { riskName: name };
      this.init();
    },
    // 选择切换
    selectionChange: function (selections) {
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
      _this.form = row;
      _this.dialog = true;
    },
    subDelete(id) {
      this.$confirm("确定删除嘛？")
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
</style>
