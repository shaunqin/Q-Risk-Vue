<template>
  <el-form ref="form" :model="queryForm" size="mini" inline>
    <el-form-item label="是否按年度">
      <el-select v-model="queryForm.yearType" style="width:130px" placeholder="请选择是否按年度">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否包含当前月">
      <el-select v-model="queryForm.includeCurrentMonth" style="width:130px" placeholder="请选择是否包含当前月">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="月份长度">
      <el-input-number v-model="queryForm.dateLength" controls-position="right" :min="1" :max="9999" style="width:130px"></el-input-number>
    </el-form-item>
    <!-- <el-form-item label="是否启用">
      <el-select v-model="queryForm.enable" style="width:130px" placeholder="请选择是否启用">
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
    </el-form-item> -->
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: inline;
}
</style>