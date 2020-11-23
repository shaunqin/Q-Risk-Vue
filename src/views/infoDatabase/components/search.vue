<template>
  <el-form size="mini" :model="queryForm" label-width="40px" label-position="left" inline>
    <el-form-item label="编号">
      <el-input v-model="queryForm.no" placeholder="请输入编号"></el-input>
    </el-form-item>
    <el-form-item label="发生日期" label-width="75px">
      <el-date-picker
        v-model="date"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        style="width:240px"
        unlink-panels
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="问题描述" label-width="75px">
      <el-input v-model="queryForm.problemDescription" placeholder="请输入问题描述"></el-input>
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
      date: "",
    };
  },
  watch: {
    date(val) {
      if (val) {
        this.queryForm.startHappenDate = val[0];
        this.queryForm.endHappenDate = val[1];
      } else {
        this.queryForm.startHappenDate = "";
        this.queryForm.endHappenDate = "";
      }
    },
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
      this.date = "";
      this.toQuery(this.queryForm);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>