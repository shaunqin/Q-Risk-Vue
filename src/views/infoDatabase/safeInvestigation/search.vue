<template>
  <el-form size="mini" :model="queryForm" label-width="75px" label-position="left" inline>
    <!-- <el-form-item label="信息来源">
      <el-input v-model="queryForm.infoSource" placeholder="请输入信息来源"></el-input>
    </el-form-item> -->
    <el-form-item label="事件概述">
      <el-input v-model="queryForm.eventOverview" placeholder="请输入事件概述"></el-input>
    </el-form-item>
    <el-form-item label="原因分析">
      <el-input v-model="queryForm.causeAnalysis" placeholder="请输入原因分析"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery(queryForm)"
      >搜索</el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-refresh"
        @click="refresh"
      >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {},
    };
  },
  methods: {
    toQuery(params) {
      let _this = this.$parent;
      _this.page = 1;
      _this.params = { ...params };
      _this.init();
    },
    refresh() {
      this.queryForm = {};
      this.toQuery(this.queryForm);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>