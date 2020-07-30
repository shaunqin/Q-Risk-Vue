<template>
  <el-form ref="form" :model="queryForm" size="mini" inline>
    <el-form-item label="任务名称">
      <el-input v-model="queryForm.jobName" placeholder="请输入任务名称" style="width:130px"></el-input>
    </el-form-item>
    <el-form-item label="任务组名">
      <el-select v-model="queryForm.jobGroup" placeholder="请选择任务组名" style="width:130px">
        <el-option label="默认" value="默认"></el-option>
        <el-option label="系统" value="系统"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="任务状态">
      <el-select v-model="queryForm.status" placeholder="请选择任务状态名" style="width:130px">
        <el-option label="正常" value="1"></el-option>
        <el-option label="暂停" value="0"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      queryForm: { jobName: "", jobGroup: "", status: "" },
    };
  },
};
</script>

<style lang="scss" scoped>
.el-form {
  display: inline;
}
</style>